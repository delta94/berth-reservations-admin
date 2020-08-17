/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { NotificationTemplateLanguage } from "./../../../@types/__generated__/globalTypes";

// ====================================================
// GraphQL query operation: NOTIFICATION_TEMPLATES
// ====================================================

export interface NOTIFICATION_TEMPLATES_notificationTemplates_edges_node_translations {
  __typename: "NotificationTranslationType";
  bodyHtml: string | null;
  bodyText: string | null;
  languageCode: NotificationTemplateLanguage;
  preview: string | null;
  subject: string | null;
}

export interface NOTIFICATION_TEMPLATES_notificationTemplates_edges_node {
  __typename: "NotificationTemplateNode";
  id: string;
  preview: string | null;
  translations: (NOTIFICATION_TEMPLATES_notificationTemplates_edges_node_translations | null)[];
  type: string;
}

export interface NOTIFICATION_TEMPLATES_notificationTemplates_edges {
  __typename: "NotificationTemplateNodeEdge";
  node: NOTIFICATION_TEMPLATES_notificationTemplates_edges_node | null;
}

export interface NOTIFICATION_TEMPLATES_notificationTemplates {
  __typename: "NotificationTemplateNodeConnection";
  edges: (NOTIFICATION_TEMPLATES_notificationTemplates_edges | null)[];
}

export interface NOTIFICATION_TEMPLATES {
  notificationTemplates: NOTIFICATION_TEMPLATES_notificationTemplates | null;
}
