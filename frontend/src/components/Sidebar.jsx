import React from "react";
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
                    // Requires v1.9.1+ (https://github.com/abhijithvijayan/react-minimal-side-navigation/issues/13)
                    elemBefore: () => <Icon name="cloud-snow" />,
                  },
                  {
                    title: "Assigned",
                    itemId: "/pending",
                    elemBefore: () => <Icon name="coffee" />,
                  },
                  {
                    title: "Accepted",
                    itemId: "/accepted",
                    elemBefore: () => <Icon name="coffee" />,
                  },
                  {
                    title: "Cancelled",
                    itemId: "/rejected",
                    elemBefore: () => <Icon name="coffee" />,
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
                title: "Vehicle",
                itemId: "",
                elemBefore: () => <Icon name="user" />,
                subNav: [
                  {
                    title: "Open",
                    itemId: "/userServices",
                    // Requires v1.9.1+ (https://github.com/abhijithvijayan/react-minimal-side-navigation/issues/13)
                    elemBefore: () => <Icon name="cloud-snow" />,
                  },
                  {
                    title: "Assigned",
                    itemId: "/pending",
                    elemBefore: () => <Icon name="coffee" />,
                  },
                  {
                    title: "Accepted",
                    itemId: "/accepted",
                    elemBefore: () => <Icon name="coffee" />,
                  },
                  {
                    title: "Cancelled",
                    itemId: "/rejected",
                    elemBefore: () => <Icon name="coffee" />,
                  },
                ],
              },
              {
                title: "Another Item",
                itemId: "",
                subNav: [
                  {
                    title: "Teams",
                    itemId: "/management/teams",
                  },
                ],
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
