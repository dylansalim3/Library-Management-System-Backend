const express = require('express');
const notifications = express.Router();
const NotificationController = require('./../controller/NotificationController');

notifications.post('/send-notification',NotificationController.sendNotification);

notifications.post('/get-notifications',NotificationController.getNotifications);

notifications.post('/get-unread-notification-count',NotificationController.getUnreadNotificationCount);

notifications.post('/update-notification-to-read',NotificationController.updateNotificationToRead);

module.exports = notifications;