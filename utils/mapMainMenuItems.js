import { v4 as uuid } from 'uuid';

export const mapMainMenuItems = (menuItems) => {
    if (!Array.isArray(menuItems)) {
        // Handle the case when menuItems is not an array
        console.error('menuItems is not an array');
        return [];
    }

    return menuItems.map((menuItem) => ({
        id: uuid(),
        destination: menuItem.menuItem.destination?.uri,
        label: menuItem.menuItem.label,
        subMenuItems: (menuItem.items || []).map((subMenuItem) => ({
            id: uuid(),
            destination: subMenuItem.destination?.uri,
            label: subMenuItem.label,
        })),
    }));
};