import React, { useState } from "react";
import { Navigation } from "react-minimal-side-navigation";
import "react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css";
import Icon from "awesome-react-icons";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import "./sideBar.css";

export default function Sidebar() {
  const auth = useSelector((state) => state.auth);
  const { user, isLogged, isWorker, iscustomer } = auth;

  const navigate = useNavigate();
  return (
    <div className="sidebar">
      <>
        {isWorker ? (
          <Navigation
            // you can use your own router's api to get pathname
            activeItemId="/management/members"
            onSelect={({ itemId }) => {
              navigate(itemId);
              // maybe push to the route
            }}
            items={[
              {
                title: "",
                itemId: "",
                elemBefore: () => (
                  <span className="fw-bold fs-5">My Services</span>
                ),
                subNav: [
                  {
                    title: "Open",
                    itemId: "/userServices",
                    elemBefore: () => (
                      <img src="https://img.icons8.com/external-dygo-kerismaker/20/000000/external-Pending-management-dygo-kerismaker.png" />
                    ),
                  },
                  {
                    title: "Assigned",
                    itemId: "/pending",
                    elemBefore: () => (
                      <img src="https://img.icons8.com/external-sbts2018-solid-sbts2018/20/FEA82F/external-active-basic-ui-elements-2.3-sbts2018-solid-sbts2018.png" />
                    ),
                  },
                  {
                    title: "Accepted",
                    itemId: "/accepted",
                    elemBefore: () => (
                      <img src="https://img.icons8.com/color/20/000000/double-tick.png" />
                    ),
                  },
                  {
                    title: "Cancelled",
                    itemId: "/rejected",
                    elemBefore: () => (
                      <img src="https://img.icons8.com/external-those-icons-flat-those-icons/17/000000/external-Remove-interface-those-icons-flat-those-icons.png" />
                    ),
                  },
                ],
              },
            ]}
          />
        ) : (
          ""
        )}

        {iscustomer ? (
          <Navigation
            // you can use your own router's api to get pathname
            activeItemId="/management/members"
            onSelect={({ itemId }) => {
              navigate(itemId);
              // maybe push to the route
            }}
            items={[
              {
                title: "All Services",
                itemId: `/allServices`,
              },
              {
                title: "Technicians",
                itemId: `/allServices/${"Technicians"}`,
              },
              {
                title: "Repair",
                itemId: `/allServices/${"Repair"}`,
              },
              {
                title: "IT",
                itemId: `/allServices/${"IT"}`,
              },
              {
                title: "House",
                itemId: `/allServices/${"House"}`,
              },
              {
                title: "Garden",
                itemId: `/allServices/${"Garden"}`,
              },
              {
                title: "Beauty & Event",
                itemId: `/allServices/${"Beauty & Event"}`,
              },
            ]}
          />
        ) : (
          ""
        )}
      </>
    </div>
  );
}
