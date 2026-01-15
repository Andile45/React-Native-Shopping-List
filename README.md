# 🛒 React Native Shopping List

A modern, feature-rich shopping list application built with React Native and Expo. Manage your shopping items with ease, track purchases, and keep your list organized.

## ✨ Features

- **Add Items**: Quickly add shopping items with name and quantity
- **Edit Items**: Inline editing for item names and quantities
- **Delete Items**: Remove items from your list
- **Toggle Purchase Status**: Mark items as purchased/unpurchased with a switch
- **Search Functionality**: Search items by name (case-insensitive)
- **Filter Options**: View all items, purchased items, or pending items
- **Persistent Storage**: Your shopping list is automatically saved and restored using AsyncStorage
- **Modern UI**: Clean, intuitive interface with modal dialogs and floating action button
- **Visual Feedback**: Purchased items are displayed with strikethrough text

## 🛠️ Tech Stack

- **React Native** - Cross-platform mobile framework
- **Expo** - Development platform and tooling
- **Expo Router** - File-based routing system
- **Redux Toolkit** - State management
- **TypeScript** - Type-safe development
- **AsyncStorage** - Local data persistence
- **React Native Gesture Handler** - Smooth interactions

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/) (optional, but recommended)
- [Expo Go](https://expo.dev/client) app on your iOS/Android device (for testing)

## 🚀 Getting Started

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/React-Native-Shopping-List.git
   cd React-Native-Shopping-List
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   # or
   npx expo start
   ```

### Running the App

After starting the development server, you can run the app on:

- **iOS Simulator**: Press `i` in the terminal or run `npm run ios`
- **Android Emulator**: Press `a` in the terminal or run `npm run android`
- **Web Browser**: Press `w` in the terminal or run `npm run web`
- **Physical Device**: Scan the QR code with Expo Go app (iOS) or Camera app (Android)

## 📱 Usage

### Adding Items

1. Tap the **+** floating action button at the bottom right
2. Enter the item name
3. Enter the quantity (default: 1)
4. Tap "Add Item" to save

### Editing Items

1. Tap the **"Edit"** button on any item
2. Modify the name or quantity in the text fields
3. Tap **"Save"** to update the item

### Marking Items as Purchased

- Toggle the switch next to any item to mark it as purchased/unpurchased
- Purchased items are displayed with strikethrough text

### Searching Items

- Type in the search bar at the top to filter items by name
- Search is case-insensitive and updates in real-time

### Filtering Items

Use the filter buttons to view:
- **All**: Show all items
- **Purchased**: Show only purchased items
- **Pending**: Show only unpurchased items

### Deleting Items

- Tap the **"Delete"** button on any item to remove it from the list

## 📁 Project Structure

```
React-Native-Shopping-List/
├── app/                    # Expo Router pages
│   ├── _layout.tsx        # Root layout with Redux Provider
│   └── index.tsx          # Main entry point
├── src/
│   ├── components/        # Reusable components
│   │   └── PressableButton.tsx
│   ├── hooks/            # Custom React hooks
│   │   └── redux.ts      # Typed Redux hooks
│   ├── screens/          # Screen components
│   │   └── ShoppingListScreen.tsx
│   ├── store/            # Redux store configuration
│   │   ├── index.ts      # Store setup
│   │   └── ShoppingListSlice.ts  # Redux slice
│   ├── types/            # TypeScript type definitions
│   │   └── shopping.types.ts
│   └── utils/            # Utility functions
│       └── storage.ts    # AsyncStorage helpers
├── assets/               # Images and static assets
├── package.json
├── tsconfig.json
└── README.md
```

## 🔧 Available Scripts

- `npm start` - Start the Expo development server
- `npm run android` - Run on Android emulator/device
- `npm run ios` - Run on iOS simulator/device
- `npm run web` - Run in web browser
- `npm run lint` - Run ESLint to check code quality

## 🏗️ Architecture

### State Management

The app uses **Redux Toolkit** for state management:

- **Store**: Configured in `src/store/index.ts`
- **Slice**: Shopping list state and actions in `src/store/ShoppingListSlice.ts`
- **Actions**: `addItem`, `deleteItem`, `togglePurchased`, `editItem`, `setItems`

### Data Persistence

- Items are automatically saved to **AsyncStorage** whenever the list changes
- Items are loaded from storage when the app starts
- Storage key: `SHOPPING_LIST`

### Routing

- Uses **Expo Router** for file-based routing
- Main screen is defined in `app/index.tsx`

## 🎨 UI Components

### PressableButton

A reusable button component with:
- Primary and secondary variants
- Press state animations
- Disabled state support
- Custom styling options

## 📝 Type Definitions

```typescript
interface ShoppingItem {
  id: string;
  name: string;
  quantity: number;
  purchased: boolean;
}
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Built with [Expo](https://expo.dev/)
- State management with [Redux Toolkit](https://redux-toolkit.js.org/)
- Icons and UI components from React Native

## 📞 Support

If you have any questions or issues, please open an issue on GitHub.

---

Made with ❤️ using React Native and Expo
