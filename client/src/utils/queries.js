import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($email: String!) {
    user(email: $email) {
      _id
      email
      babysitters {
        _id
        babysitterText
        createdAt
      }
    }
  }
`;
export const QUERY_BABYSITTERS = gql`
  query getBabysitters{
    babysitters {
      _id
      babysitterText
      babysitterAuthor
      createdAt
    }
  }
`;

export const QUERY_SINGLE_BABYSITTER = gql`
  query getSingleBabysitter($babysitterId: ID!) {
    babysitter(babysitterId: $babysitterId) {
      _id
      babysitterText
      babysitterAuthor
      createdAt
      ratings {
        _id
        ratingText
        ratingAuthor
        createdAt
      }
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      email
      babysitters {
        _id
        babysitterText
        babysitterAuthor
        createdAt
      }
    }
  }
`;