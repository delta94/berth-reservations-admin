import gql from 'graphql-tag';

export const NOTIFICATION_TEMPLATES_QUERY = gql`
  query NOTIFICATION_TEMPLATES {
    notificationTemplates {
      edges {
        node {
          id
          preview
          translations {
            bodyHtml
            bodyText
            languageCode
            preview
            subject
          }
          type
        }
      }
    }
  }
`;
