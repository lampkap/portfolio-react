import { gql } from 'apollo-boost';

const getProjectsQuery = gql`
    {
        projects{
            id
            name
            description
            link
            image
        }
    }
`

export { getProjectsQuery };