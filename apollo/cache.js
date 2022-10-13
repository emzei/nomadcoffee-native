import {
  FieldFunctionOptions,
  FieldPolicy,
  InMemoryCache,
} from "@apollo/client";

const seeCoffeeShopsFieldPolicy = {
  keyArgs: false,
  merge: (existing, incoming, options) => {
    if (options.args?.hasOwnProperty("lastId") && options.args?.lastId !== 0) {
      const safePrev = existing ? existing.slice(0) : [];
      return [...safePrev, ...incoming];
    } else {
      return [...incoming];
    }
  },
};

export const apolloCache = new InMemoryCache({
  typePolicies: {
    Category: {
      keyFields: (obj) => `Category:${obj.slug}`,
    },
    Query: {
      fields: {
        seeCoffeeShops: seeCoffeeShopsFieldPolicy,
      },
    },
  },
});
