import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import PersonIcon from '@mui/icons-material/Person';

export default function ProfileDropDown() {
    return (
    <Menu as="div" className="relative ml-3">
        <MenuButton className="relative flex rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
            <span className="absolute -inset-1.5" />
            <span className="sr-only">Open user menu</span>
            <PersonIcon sx={{color: "#969696ff"}}/>
        </MenuButton>

        <MenuItems
            transition
            className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-gray-800 py-1 outline -outline-offset-1 outline-white/10 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
        >
            <MenuItem>
            <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-300 data-focus:bg-white/5 data-focus:outline-hidden"
            >
                Sign out
            </a>
            </MenuItem>
        </MenuItems>
    </Menu>);
}