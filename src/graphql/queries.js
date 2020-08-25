import gql from 'graphql-tag';
export const FETCH_DATA = gql`
    query{
    allObjectInformation{
        edges{
        node{
            id_
            name
            nameVi
            urlIcon
        }
        }
    }
    }
`;