import { getNotificationTemplates } from '../utils';
import { mockData, mockHtml } from '../__fixtures__/mockData';
import { NOTIFICATION_TEMPLATES } from '../__generated__/NOTIFICATION_TEMPLATES';

describe('utils', () => {
  describe('getNotificationTemplates', () => {
    it('should return notification templates', () => {
      expect(getNotificationTemplates(mockData)).toMatchSnapshot();
    });

    it('should return empty array when there are no notification templates', () => {
      const emptyData: NOTIFICATION_TEMPLATES = {
        notificationTemplates: {
          __typename: 'NotificationTemplateNodeConnection',
          edges: [],
        },
      };
      expect(getNotificationTemplates(emptyData)).toEqual([]);
      expect(getNotificationTemplates(undefined)).toEqual([]);
    });

    it('should handle null translations', () => {
      const emptyData: NOTIFICATION_TEMPLATES = {
        notificationTemplates: {
          __typename: 'NotificationTemplateNodeConnection',
          edges: [
            {
              __typename: 'NotificationTemplateNodeEdge',
              node: {
                __typename: 'NotificationTemplateNode',
                id: 'TEST-TEMPLATE',
                preview: mockHtml,
                translations: [null],
                type: 'Test Template',
              },
            },
          ],
        },
      };
      expect(getNotificationTemplates(emptyData)[0].translations).toEqual({});
    });
  });
});
