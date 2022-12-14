import { gql } from "@apollo/client";
import { ALL_SHOP, ALL_USER, PART_SHOP } from "./fragments";

export const MUTATION_CREATE_ACCOUNT = gql`
  mutation CreateAccount(
    $username: String!
    $email: String!
    $name: String
    $password: String!
    $location: String
    $githubUsername: String
  ) {
    createAccount(
      username: $username
      email: $email
      name: $name
      password: $password
      location: $location
      githubUsername: $githubUsername
    ) {
      ok
      error
    }
  }
`;

export const MUTATION_LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      ok
      error
      token
    }
  }
`;

export const MUTATION_CREATE_SHOP = gql`
  mutation CreateShop(
    $name: String!
    $categories: [String]!
    $address: String!
    $lat: Float!
    $lng: Float!
    $photos: [Upload]
  ) {
    createCoffeeShop(
      name: $name
      categories: $categories
      address: $address
      lat: $lat
      lng: $lng
      photos: $photos
    ) {
      ok
      error
    }
  }
`;

export const QUERY_SHOPS = gql`
  query AllShops($lastId: Int) {
    seeCoffeeShops(lastId: $lastId) {
      ...AllShop
    }
  }
  ${ALL_SHOP}
`;

export const QUERY_SEE_CAFE = gql`
  query SeeCafe($id: Int!) {
    seeCoffeeShop(id: $id) {
      ...AllShop
    }
  }
  ${ALL_SHOP}
`;

export const MUTATION_DELETE_SHOP = gql`
  mutation DeleteShop($id: Int!) {
    deleteCoffeeShop(id: $id) {
      ok
      error
    }
  }
`;

export const MUTATION_EDIT_SHOP = gql`
  mutation EditShop(
    $id: Int!
    $name: String
    $address: String
    $lat: Float
    $lng: Float
    $photos: [Upload]
  ) {
    editCoffeeShop(
      id: $id
      name: $name
      address: $address
      lat: $lat
      lng: $lng
      photos: $photos
    ) {
      ok
      error
    }
  }
`;

export const MUTATION_ADD_CATEGORY_TO_SHOP = gql`
  mutation AddCategory($id: Int!, $categories: [String]!) {
    addCategoriesToShop(id: $id, categories: $categories) {
      ok
      error
    }
  }
`;

export const MUTATION_REMOVE_CATEGORY_FROM_SHOP = gql`
  mutation RemoveCategory($id: Int!, $slug: String!) {
    removeCategoryFromShop(id: $id, slug: $slug) {
      ok
      error
    }
  }
`;

export const MUTATION_REMOVE_PHOTO_FROM_SHOP = gql`
  mutation RemovePhoto($id: Int!, $photoId: Int!) {
    removePhotoFromShop(id: $id, photoId: $photoId) {
      ok
      error
    }
  }
`;

export const QUERY_SEE_CATEGORY = gql`
  query SeeCategory($slug: String!) {
    seeCategory(slug: $slug) {
      id
      name
      slug
      totalShops
      shops {
        ...AllShop
      }
    }
  }
  ${ALL_SHOP}
`;

export const QUERY_USER = gql`
  query SeeUser($id: Int!) {
    seeUser(id: $id) {
      ...AllUser
    }
  }
  ${ALL_USER}
`;

export const QUERY_USERS_SHOPS = gql`
  query MyShops($id: Int!) {
    searchShopsByUserId(id: $id) {
      ...AllShop
    }
  }
  ${ALL_SHOP}
`;

export const MUTATION_EDIT_PROFILE = gql`
  mutation EditProfile(
    $id: Int!
    $username: String
    $email: String
    $password: String
    $name: String
    $location: String
    $githubUsername: String
  ) {
    editProfile(
      id: $id
      username: $username
      email: $email
      password: $password
      name: $name
      location: $location
      githubUsername: $githubUsername
    ) {
      ok
      error
    }
  }
`;

export const QUERY_SEARCH_USER = gql`
  query SearchUsers($term: String!) {
    searchUsers(term: $term) {
      total
      results {
        ...AllUser
      }
    }
  }
  ${ALL_USER}
`;

export const QUERY_SEARCH_SHOPS = gql`
  query SearchShops($term: String!) {
    searchShopsByTerm(term: $term) {
      ...PartShop
    }
  }
  ${PART_SHOP}
`;

export const QUERY_SEARCH_CATEGORY = gql`
  query SearchCategory($term: String!) {
    searchCategoriesByTerm(term: $term) {
      id
      name
      slug
      totalShops
      shops {
        ...PartShop
      }
    }
  }
  ${PART_SHOP}
`;
