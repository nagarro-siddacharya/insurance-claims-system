import { RoleName } from "src/common/enums/roles.enum";

export const users = [
  // Admins
  {
    firstName: 'Admin',
    lastName: 'One',
    email: 'admin1@insurance.com',
    role: RoleName.ADMIN,
  },
  {
    firstName: 'Admin',
    lastName: 'Two',
    email: 'admin2@insurance.com',
    role: RoleName.ADMIN,
  },

  // Incident Managers
  {
    firstName: 'Rajesh',
    lastName: 'Sharma',
    email: 'incident1@insurance.com',
    role: RoleName.CASE_MANAGER,
  },
  {
    firstName: 'Priya',
    lastName: 'Patel',
    email: 'incident2@insurance.com',
    role: RoleName.CASE_MANAGER,
  },
  {
    firstName: 'Arun',
    lastName: 'Nair',
    email: 'incident3@insurance.com',
    role: RoleName.CASE_MANAGER,
  },

  // Surveyors
  {
    firstName: 'Vikram',
    lastName: 'Singh',
    email: 'surveyor1@insurance.com',
    role: RoleName.SURVEYOR,
  },
  {
    firstName: 'Sneha',
    lastName: 'Reddy',
    email: 'surveyor2@insurance.com',
    role: RoleName.SURVEYOR,
  },
  {
    firstName: 'Karan',
    lastName: 'Joshi',
    email: 'surveyor3@insurance.com',
    role: RoleName.SURVEYOR,
  },

  // Adjusters
  {
    firstName: 'Amit',
    lastName: 'Gupta',
    email: 'adjuster1@insurance.com',
    role: RoleName.ADJUSTER,
  },
  {
    firstName: 'Neha',
    lastName: 'Kapoor',
    email: 'adjuster2@insurance.com',
    role: RoleName.ADJUSTER,
  },
  {
    firstName: 'Rahul',
    lastName: 'Verma',
    email: 'adjuster3@insurance.com',
    role: RoleName.ADJUSTER,
  },

  // Customers
  {
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@email.com',
    role: RoleName.CUSTOMER,
  },
  {
    firstName: 'Michael',
    lastName: 'Brown',
    email: 'michael.brown@email.com',
    role: RoleName.CUSTOMER,
  },
  {
    firstName: 'Emily',
    lastName: 'Davis',
    email: 'emily.davis@email.com',
    role: RoleName.CUSTOMER,
  },
  {
    firstName: 'Daniel',
    lastName: 'Wilson',
    email: 'daniel.wilson@email.com',
    role: RoleName.CUSTOMER,
  },
  {
    firstName: 'Sophia',
    lastName: 'Taylor',
    email: 'sophia.taylor@email.com',
    role: RoleName.CUSTOMER,
  },
  {
    firstName: 'William',
    lastName: 'Anderson',
    email: 'william.anderson@email.com',
    role: RoleName.CUSTOMER,
  },
  {
    firstName: 'Olivia',
    lastName: 'Thomas',
    email: 'olivia.thomas@email.com',
    role: RoleName.CUSTOMER,
  },
  {
    firstName: 'James',
    lastName: 'Jackson',
    email: 'james.jackson@email.com',
    role: RoleName.CUSTOMER,
  },
];