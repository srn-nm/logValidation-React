import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import ProfileDropDown from './ProfileDropdown'
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import { useNavigate, useLocation } from 'react-router-dom';

const navigation = [
  { name: 'Dashboard', href: '/Dashboard', current: false },
  { name: 'Schema Validation', href: '/SchemaValidation', current: false },
]

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar() {

  const navigate = useNavigate();
  const location = useLocation();

  const isCurrent = (href: string) => {
    return location.pathname === href || (location.pathname === '/' && href === '/Dashboard');
  }

  const handleNavigation = (href: string) => {
    navigate(href);
  }

  return (
    <Disclosure
      as="nav"
      className="relative bg-gray-800/50 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-white/10"
    >
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-white/5 hover:text-white focus:outline-2 focus:-outline-offset-1 focus:outline-indigo-500">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <button 
                onClick={() => handleNavigation('/')}
                className="cursor-pointer hover:opacity-80 transition-opacity"
              >
                <LeaderboardIcon sx={{ color: "#969696ff" }} fontSize="large"/>
              </button>
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item) => {
                  return (
                    <button
                      key={item.name}
                      onClick={() => handleNavigation(item.href)}
                      aria-current={isCurrent(item.href) ? 'page' : undefined}
                      className={classNames(
                        isCurrent(item.href) ? 'bg-gray-950/50 text-white' : 'text-gray-300 hover:bg-white/5 hover:text-white',
                        'rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200',
                      )}
                    >
                      {item.name}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <button
              type="button"
              className="relative rounded-full p-1 text-gray-400 hover:text-white focus:outline-2 focus:outline-offset-2 focus:outline-indigo-500"
            >
              <span className="absolute -inset-1.5" />
              <span className="sr-only">View notifications</span>
              <BellIcon aria-hidden="true" className="size-6" />
            </button>

            <ProfileDropDown/>
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pt-2 pb-3">
          {navigation.map((item) => {
            return (
              <DisclosureButton
                key={item.name}
                as="button"
                onClick={() => handleNavigation(item.href)}
                aria-current={isCurrent(item.href) ? 'page' : undefined}
                className={classNames(
                  isCurrent(item.href) ? 'bg-gray-950/50 text-white' : 'text-gray-300 hover:bg-white/5 hover:text-white',
                  'block rounded-md px-3 py-2 text-base font-medium w-full text-left transition-colors duration-200',
                )}
              >
                {item.name}
              </DisclosureButton>
            );
          })}
        </div>
      </DisclosurePanel>
    </Disclosure>
  )
}