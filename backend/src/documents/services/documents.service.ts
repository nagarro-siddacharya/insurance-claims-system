import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DocumentsRepository } from '../repositories/documents.repository';
import { JwtUser } from 'src/common/interfaces/jwt-user.interface';
import { ClaimsRepository } from 'src/claims/repositories/claims.repository';
import { RoleName } from 'src/common/enums/roles.enum';
import * as fs from 'fs';

@Injectable()
export class DocumentsService {
  constructor(
    private readonly documentsRepository: DocumentsRepository,
    private readonly claimsRepository: ClaimsRepository,
  ) {}

  async upload(claimId: string, file: any, user: JwtUser) {
    const claim = await this.claimsRepository.findById(claimId);

    if (!claim) {
      throw new NotFoundException('Claim not found');
    }

    if (claim.customerId !== user.id && user.role === RoleName.CUSTOMER) {
      throw new ForbiddenException(
        'Not allowed to upload documents for this claim',
      );
    }

    return this.documentsRepository.create({
      fileName: file.filename,
      originalName: file.originalname,
      mimeType: file.mimetype,
      fileSize: file.size,
      filePath: file.path,
      claimId: claimId,
    });
  }

  async fetchAllByClaimId(claimId: string, user: JwtUser) {
    const claim = await this.claimsRepository.findById(claimId);

    if (!claim) {
      throw new NotFoundException('Claim not found');
    }

    if (claim.customerId !== user.id && user.role === RoleName.CUSTOMER) {
      throw new ForbiddenException(
        'Not allowed to view documents for this claim',
      );
    }

    return this.documentsRepository.fetchAllByClaimId(claimId);
  }

  async findById(id: string, user: JwtUser) {
    const document = await this.documentsRepository.findById(id);

    if (!document) {
      throw new NotFoundException('Document not found');
    }

    const claim = await this.claimsRepository.findById(document.claimId);

    if (!claim) {
      throw new NotFoundException('Claim not found');
    }

    if (claim.customerId !== user.id && user.role === RoleName.CUSTOMER) {
      throw new ForbiddenException('Not allowed to view this document');
    }

    return document;
  }

  async deleteById(id: string, user: JwtUser) {
    const document = await this.documentsRepository.findById(id);

    if (!document) {
      throw new NotFoundException('Document not found');
    }

    const claim = await this.claimsRepository.findById(document.claimId);

    if (!claim) {
      throw new NotFoundException('Claim not found');
    }

    if (claim.customerId !== user.id && user.role === RoleName.CUSTOMER) {
      throw new ForbiddenException('Not allowed to delete this document');
    }

    fs.unlink(document.filePath, (err) => {
      if (err) {
        console.error('Error deleting file from system:', err);
      }
    });

    return this.documentsRepository.deleteById(id);
  }
}
