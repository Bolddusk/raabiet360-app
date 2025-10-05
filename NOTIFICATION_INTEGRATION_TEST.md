# 🔔 Notification Integration Test Guide

## ✅ **Integration Complete!**

The notification system has been successfully integrated into the mobile app with the new `v1/m/` prefixed endpoints.

## 🧪 **Testing Instructions**

### **1. Start the Backend Server**
```bash
cd /Users/hamza/Downloads/Office/Sehar/fnp-web-backend
npm run start:dev
```

### **2. Start the Mobile App**
```bash
cd /Users/hamza/Downloads/Office/Sehar/raabiet360-app
npm start
# or
npx react-native run-ios
# or
npx react-native run-android
```

### **3. Test Notification Features**

#### **A. Basic Notification Fetching**
1. **Login to the app** with valid credentials
2. **Check the console logs** for notification fetching:
   - Look for `🔔 useEffect triggered:` logs
   - Look for `🔔 Fetching notifications...` logs
   - Look for `🔔 API Response:` logs

#### **B. Notification Bell & Badge**
1. **Navigate to the Home screen** (where the header shows)
2. **Check the notification bell** in the top-right corner
3. **Verify the unread count badge** appears if there are unread notifications
4. **Tap the bell** to open the notification drawer

#### **C. Notification Drawer**
1. **Open the notification drawer** by tapping the bell
2. **Verify notifications are displayed** in the list
3. **Test notification actions**:
   - Tap a notification to mark it as read
   - Use "Mark All as Read" button
   - Use "Clear All" button
   - Use refresh button to reload notifications

#### **D. Test Notification (Long Press)**
1. **Long press the notification bell** (hold for ~1 second)
2. **Check console logs** for test notification response
3. **Verify a new test notification appears** in the drawer

### **4. Debug Information**

The app now includes comprehensive logging. Check the console for:

```
🔔 useEffect triggered: { hasToken: true, hasUser: true, userId: 123, baseURL: "http://localhost:3000/api" }
🔔 Auth data available, calling refreshNotifications
🔔 Fetching notifications...
🔔 Auth data: { hasToken: true, userId: 123, tokenPreview: "eyJhbGciOiJIUzI1NiIs..." }
🔔 Calling notificationApi.getNotifications with params: { page: 1, limit: 50 }
🔔 NotificationApi - endpoint: v1/m/notifications?page=1&limit=50
🔔 NotificationApi - full URL: http://localhost:3000/api/v1/m/notifications?page=1&limit=50
🔔 NotificationApi - response received: 200 { success: true, data: {...} }
🔔 Successfully fetched notifications: 5
```

### **5. Expected API Endpoints**

The app now calls these endpoints with the `v1/m/` prefix:

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/v1/m/notifications` | Fetch notifications |
| PATCH | `/v1/m/notifications/:id/read` | Mark as read |
| PATCH | `/v1/m/notifications/mark-all-read` | Mark all as read |
| DELETE | `/v1/m/notifications/clear-all` | Clear all notifications |
| GET | `/v1/m/notifications/unread-count` | Get unread count |
| GET | `/v1/m/notifications/stats` | Get statistics |
| GET | `/v1/m/notifications/connection-stats` | Get connection stats |
| GET | `/v1/m/notifications/test-notification` | Send test notification |

### **6. Troubleshooting**

#### **If notifications don't load:**
1. **Check authentication**: Ensure user is logged in
2. **Check network**: Verify backend is running on correct port
3. **Check console logs**: Look for error messages
4. **Check API endpoint**: Verify the URL includes `v1/m/` prefix

#### **If you see "Failed to fetch notifications" error:**
1. **Check backend logs**: Look for server-side errors
2. **Verify JWT token**: Ensure token is valid and not expired
3. **Check endpoint availability**: Test endpoints with curl or Postman
4. **Check CORS settings**: Ensure mobile app can access backend

#### **If test notification doesn't work:**
1. **Check long press**: Hold the bell icon for ~1 second
2. **Check console logs**: Look for test notification response
3. **Verify backend**: Ensure test endpoint is working

### **7. Manual API Testing**

You can also test the endpoints manually:

```bash
# Get notifications
curl -X GET http://localhost:3000/api/v1/m/notifications \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"

# Send test notification
curl -X GET http://localhost:3000/api/v1/m/notifications/test-notification \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"

# Get connection stats
curl -X GET http://localhost:3000/api/v1/m/notifications/connection-stats \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## 🎉 **Success Indicators**

✅ **Notifications load automatically** when user logs in  
✅ **Notification bell shows unread count** badge  
✅ **Notification drawer opens** and displays notifications  
✅ **Mark as read functionality** works  
✅ **Mark all as read** works  
✅ **Clear all notifications** works  
✅ **Test notification** can be sent via long press  
✅ **No console errors** related to notifications  
✅ **All API calls use v1/m/ prefix**  

## 📱 **Mobile App Features**

- **Real-time notification fetching** on app startup
- **Notification bell with unread count badge**
- **Slide-out notification drawer** with smooth animations
- **Mark individual notifications as read**
- **Mark all notifications as read**
- **Clear all notifications**
- **Pull-to-refresh functionality**
- **Test notification via long press**
- **Comprehensive error handling**
- **Optimistic UI updates**

The notification system is now fully integrated and ready for production use! 🚀
