import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        email
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      token
      user {
        _id
        email
      }
    }
  }
`;

export const ADD_BABYSITTER = gql`
  mutation addBabysitter($babysitterText: String!) {
    addBabysitter(babysitterText: $babysitterText) {
      _id
      babysitterText
      babysitterAuthor
      createdAt
      ratings {
        _id
        ratingText
      }
    }
  }
`;

export const ADD_RATING = gql`
  mutation addRating($babysitterId: ID!, $ratingText: String!) {
    addRating(babysitterId: $babysitterId, ratingText: $ratingText) {
      _id
      babysitterText
      babysitterAuthor
      createdAt
      ratings {
        _id
        ratingText
        createdAt
      }
    }
  }
`;
