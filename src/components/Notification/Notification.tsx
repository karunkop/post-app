// @ts-nocheck
import { notification } from "antd";

interface notificationParams {message?: string, description?: string}

export const showNotification = (type: string, { message, description }: notificationParams) => {
    notification[type]({
      message,
      description,
      placement: 'bottomRight'
    });
};

export const showSuccessNotification = (params: notificationParams) => showNotification('success', params)
export const showErrorNotification = (params: notificationParams = {}) => showNotification('error', { message: params.message || 'Error', description: params.description || 'Something went wrong!' })

