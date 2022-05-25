import { Roles } from './app-config';

export const ALL_ROLES = (userRole: Roles) =>
  userRole === Roles.Admin ||
  userRole === Roles.Editor ||
  userRole === Roles.ServiceProvider ||
  userRole === Roles.Contributor ||
  userRole === Roles.Reporter;

export const NO_ADMIN = (userRole: Roles) =>
  userRole === Roles.Editor ||
  userRole === Roles.ServiceProvider ||
  userRole === Roles.Contributor ||
  userRole === Roles.Reporter;

export const ONLY_ADMIN = (userRole: Roles) => userRole === Roles.Admin;

export const CREATE_FORUM = (userRole: Roles) => {
  return (
    userRole === Roles.Admin ||
    userRole === Roles.Editor ||
    userRole === Roles.ServiceProvider
  );
};

export const CREATE_ARTICLE = (userRole: Roles) => {
  return userRole === Roles.Editor || userRole === Roles.Reporter;
};

export const EDIT_ARTICLE = (userRole: Roles) => {
  return userRole === Roles.Editor;
};

export const CREATE_FORUM_POST = (userRole: Roles) => {
  return NO_ADMIN(userRole);
};

export const COMMENT = (userRole: Roles) => {
  return NO_ADMIN(userRole);
};

export const CREATE_RESOURCE = (userRole: Roles) => {
  return userRole === Roles.Editor || userRole === Roles.ServiceProvider;
};

export const CREATE_AD = (userRole: Roles) => {
  return NO_ADMIN(userRole);
};
