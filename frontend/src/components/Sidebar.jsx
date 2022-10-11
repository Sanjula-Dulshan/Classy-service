import React, { useState } from "react";
import { Navigation } from "react-minimal-side-navigation";
import "react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css";
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
              {
                title: "",
                itemId: "#",
                elemBefore: () => (
                  <span className="fw-bold fs-5">Bank Details</span>
                ),
                subNav: [
                  {
                    title: "Add Bank Details",
                    itemId: "/addBank",
                    elemBefore: () => (
                      <img src="https://img.icons8.com/ios-glyphs/20/000000/add--v1.png" />
                    ),
                  },
                  {
                    title: "View Bank Details",
                    itemId: "/editBank",
                    elemBefore: () => (
                      <img src="https://img.icons8.com/ios-filled/20/000000/merchant-account.png" />
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
                title: <b>All Services</b>,
                itemId: `/allServices`,
              },
              {
                title: "Technicians",
                itemId: `/allServices/${"Technicians"}`,
                elemBefore: () => (
                  <img src="https://img.icons8.com/external-itim2101-lineal-itim2101/20/000000/external-technician-male-occupation-avatar-itim2101-lineal-itim2101.png" />
                ),
              },
              {
                title: "Repair",
                itemId: `/allServices/${"Repair"}`,
                elemBefore: () => (
                  <img src="https://img.icons8.com/ios/20/000000/open-end-wrench.png" />
                ),
              },
              {
                title: "IT",
                itemId: `/allServices/${"IT"}`,
                elemBefore: () => (
                  <img src="https://img.icons8.com/ios/20/000000/laptop--v1.png" />
                ),
              },
              {
                title: "House",
                itemId: `/allServices/${"House"}`,
                elemBefore: () => (
                  <img src="https://img.icons8.com/ios/20/000000/home-page.png" />
                ),
              },
              {
                title: "Garden",
                itemId: `/allServices/${"Garden"}`,
                elemBefore: () => (
                  <img src="https://img.icons8.com/ios/20/000000/garden.png" />
                ),
              },
              {
                title: "Beauty & Event",
                itemId: `/allServices/${"Beauty & Event"}`,
                elemBefore: () => (
                  <img src="https://img.icons8.com/external-anggara-glyph-anggara-putra/20/000000/external-group-basic-user-interface-anggara-glyph-anggara-putra.png" />
                ),
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
