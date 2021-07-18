import { MutationOptions, OperationVariables, QueryOptions } from "@apollo/client";
import { initializeApollo } from "./client";

type ApolloRequest = { cookies?: { [key: string]: any } };

export function serverSideQuery<
  Data = any,
  Variables = OperationVariables
>(queryOption: QueryOptions, req: ApolloRequest) {
  const client = initializeApollo();
  const option = {
    ...queryOption,
    context: {
      ...queryOption.context,
      "x-dedong-token": req.cookies && req.cookies["next-auth.session-token"]
    }
  }

  return client.query(option);
}

export function serverSideMutation<
  Data = any,
  Variables = OperationVariables
>(mutationOption: MutationOptions, req: ApolloRequest) {
  const client = initializeApollo();
  const option = {
    ...mutationOption,
    context: {
      ...mutationOption.context,
      "x-dedong-token": req.cookies && req.cookies["next-auth.session-token"]
    }
  }

  return client.mutate(option);
}
