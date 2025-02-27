import { Fragment } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
// import { BellIcon } from "@heroicons/react/24/outline";
import { useAuth0 } from '@auth0/auth0-react';
import { useContext } from 'react';
import { Context } from '../Context';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import Logo from '../Assets/logo-white.png';
import Arrow from '../Assets/down-arrow.png';

export default function Navbar() {
  const { currentUser } = useContext(Context) as any;
  const { logout } = useAuth0();

  const navigation = [{ name: 'Insights', href: '/insights', className: '' }];

  function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(' ');
  }

  return (
    <Disclosure as='nav' className='bg-dark-cyan'>
      {({ open }) => (
        <>
          <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
            <div className='relative flex h-16 items-center justify-between'>
              <div className='absolute inset-y-0 left-0 flex items-center sm:hidden'>
                {/* Mobile menu button*/}
                <Disclosure.Button className='inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'>
                  <span className='sr-only'>Open main menu</span>
                  {open ? (
                    <XMarkIcon className='block h-6 w-6' aria-hidden='true' />
                  ) : (
                    <Bars3Icon className='block h-6 w-6' aria-hidden='true' />
                  )}
                </Disclosure.Button>
              </div>
              <div className='flex flex-1 items-center justify-center sm:items-stretch sm:justify-start'>
                <div className='flex flex-shrink-0 items-center'>
                  <Link to='/home' aria-label="Go back to Prep'd homepage">
                    <img
                      className='block h-10 w-auto mr-10 lg:hidden'
                      src={Logo}
                      alt="Prep'd"
                    />
                  </Link>
                  <Link to='/home' aria-label="Go back to Prep'd homepage">
                    <img
                      className='hidden h-10 w-auto mr-10 lg:block'
                      src={Logo}
                      alt="Prep'd"
                    />
                  </Link>
                </div>
                <Menu as='div' className='relative ml-3'>
                  <div>
                    <Menu.Button className='text-white hover:bg-african-violet-900 rounded-md px-3 py-2 font-semibold'>
                      Interview Practice
                      <img
                        src={Arrow}
                        alt='Arrow down'
                        style={{
                          display: 'inline',
                          marginLeft: 5,
                          maxWidth: 20,
                        }}
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter='transition ease-out duration-100'
                    enterFrom='transform opacity-0 scale-95'
                    enterTo='transform opacity-100 scale-100'
                    leave='transition ease-in duration-75'
                    leaveFrom='transform opacity-100 scale-100'
                    leaveTo='transform opacity-0 scale-95'
                  >
                    <Menu.Items className='absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to='/codingdashboard'
                            className={classNames(
                              active ? 'bg-gray-100' : '',
                              'block px-4 py-2 text-sm text-gray-700'
                            )}
                          >
                            Coding Challenges
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to='/interview'
                            className={classNames(
                              active ? 'bg-gray-100' : '',
                              'block px-4 py-2 text-sm text-gray-700'
                            )}
                          >
                            Live Interviews
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to='/pastinterviews'
                            className={classNames(
                              active ? 'bg-gray-100' : '',
                              'block px-4 py-2 text-sm text-gray-700'
                            )}
                          >
                            Past Interviews
                          </Link>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
                <div className='hidden sm:ml-6 sm:block'>
                  <div className='flex space-x-4'>
                    <Menu as='div' className='relative ml-3'>
                      <div>
                        <Menu.Button className='text-white hover:bg-african-violet-900 rounded-md px-3 py-2 font-semibold'>
                          Build Application
                          <img
                            src={Arrow}
                            alt='Arrow down'
                            style={{
                              display: 'inline',
                              marginLeft: 5,
                              maxWidth: 20,
                            }}
                          />
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter='transition ease-out duration-100'
                        enterFrom='transform opacity-0 scale-95'
                        enterTo='transform opacity-100 scale-100'
                        leave='transition ease-in duration-75'
                        leaveFrom='transform opacity-100 scale-100'
                        leaveTo='transform opacity-0 scale-95'
                      >
                        <Menu.Items className='absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to='/coverletterreviewer'
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm text-gray-700'
                                )}
                              >
                                Cover Letter Review
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to='/coverletterbuilder'
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm text-gray-700'
                                )}
                              >
                                Cover Letter Generator
                              </Link>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                    {navigation.map((item) => (
                      <NavLink
                        key={item.name}
                        to={item.href}
                        className={({ isActive }) =>
                          isActive
                            ? 'bg-eerie-black text-white rounded-md px-3 py-2 text-base font-semibold'
                            : 'text-white hover:bg-african-violet-900 rounded-md px-3 py-2 font-semibold'
                        }
                      >
                        {item.name}
                      </NavLink>
                    ))}
                  </div>
                </div>
              </div>

              <div className='absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
                {/* <button
                  type="button"
                  className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-8 w-8" aria-hidden="true" />
                </button> */}

                {currentUser && (
                  <Menu as='div' className='relative ml-3'>
                    <div>
                      <Menu.Button className='flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'>
                        <span className='sr-only'>Open user menu</span>
                        <img
                          className='h-10 w-10 rounded-full border-2 border-white'
                          src={currentUser.image}
                          alt={currentUser.name}
                        />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter='transition ease-out duration-100'
                      enterFrom='transform opacity-0 scale-95'
                      enterTo='transform opacity-100 scale-100'
                      leave='transition ease-in duration-75'
                      leaveFrom='transform opacity-100 scale-100'
                      leaveTo='transform opacity-0 scale-95'
                    >
                      <Menu.Items className='absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to='/settings'
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm text-gray-700'
                              )}
                            >
                              Settings
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              onClick={() =>
                                logout({
                                  logoutParams: {
                                    returnTo: window.location.origin,
                                  },
                                })
                              }
                              className={classNames(
                                active ? 'bg-gray-100 cursor-pointer' : '',
                                'block px-4 py-2 text-sm text-gray-700 cursor-pointer'
                              )}
                            >
                              Sign out
                            </a>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  );
}
