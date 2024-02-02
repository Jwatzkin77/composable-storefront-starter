import { bcGqlFetch } from "../bc-client-gql";
import { Customer } from "../types/customer";

const loginQuery = `
mutation Login(
  $email: String!,
  $password: String!
) {
  login(
    email: $email,
    password: $password
  ) {
    customer {
      entityId
    }
  }
}
`;

type LoginVars = {
  email: string,
  password: string,
}

type LoginResp = {
  data: {
    login: {
      customer: Customer,
    },
  },
}

export const login: (
  email: string, password: string
) => Promise<Customer> = async (
  email, password
) => {
  const customerResp = await bcGqlFetch<LoginResp, LoginVars>(
    loginQuery,
    {
      email,
      password,
    }
  );

  const customer = customerResp.data.login.customer;
  if (!customer) {
    throw new Error("Customer login failed");
  }

  return customer;
}
