"use client";

import {
  Avatar,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
} from "@mui/material";
import { Session } from "next-auth";
import { getSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { FiLogOut, FiSettings } from "react-icons/fi";

const AccountAvatar = () => {
  const [session, setSession] = useState<Session | null>();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    const fetchSession = async () => {
      const session = await getSession();
      setSession(session);
    };

    fetchSession();
  }, []);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        onClick={handleClick}
        className="rounded-md p-2 flex items-center gap-x-2 cursor-pointer "
      >
        <Avatar
          src={session?.user?.image ?? ""}
          alt={session?.user?.name ?? ""}
        />
        <div className="flex flex-col ">
          <p className="font-semibold text-sm">{session?.user?.name}</p>
          {/* <p className="text-gray-400 text-xs ">{session?.user?.email}</p> */}
        </div>
        <BiChevronDown className="h-6 w-6 " />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleClose} className="gap-x-2">
          <Avatar
            src={session?.user?.image ?? ""}
            alt={session?.user?.name ?? ""}
          />{" "}
          <div className="">
            <p className="font-semibold text-sm">{session?.user?.name}</p>
            <p className="text-gray-400 text-xs ">{session?.user?.email}</p>
          </div>
        </MenuItem>

        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <FiSettings />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem
          onClick={() => {
            signOut({ callbackUrl: "/login" });
          }}
        >
          <ListItemIcon>
            <FiLogOut color="#ff0000" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};
export default AccountAvatar;
