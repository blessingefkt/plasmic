import { Dropdown, Menu } from "antd";
import * as React from "react";
import { ReactNode } from "react";
import { ensure } from "../../common";
import {
  AppComponent,
  NonAuthComponent,
  NonAuthComponentProps,
} from "../app-ctx";
import { UU } from "../cli-routes";
import ChevronDownsvgIcon from "../plasmic/q_4_icons/icons/PlasmicIcon__ChevronDownsvg";
import { PlasmicColorLogo } from "./PlasmicColorLogo";
import { PublicLink } from "./PublicLink";
import { Avatar } from "./studio/Avatar";
import { HelpButton } from "./top-bar/HelpButton";
import * as widgets from "./widgets";
import { InlineIcon } from "./widgets";
import { BrowserAlertBanner } from "./widgets/BrowserAlertBanner";
import { Icon } from "./widgets/Icon";

interface NormalLayoutComponentProps {
  topBar?: ReactNode;
  children?: ReactNode;
}
class NormalLayoutComponent extends React.Component<
  NormalLayoutComponentProps,
  {}
> {
  render() {
    const { topBar } = this.props;
    return (
      <div className={"normal-layout"}>
        {topBar && (
          <div className={"normal-layout__top-bar"}>
            <div
              className={"normal-layout-content normal-layout-content--top-bar"}
            >
              <widgets.PlainLink href={"/"} className={"home-logo"}>
                <div className={"normal-layout__mark"}>
                  <PlasmicColorLogo />
                </div>
              </widgets.PlainLink>

              {topBar}
            </div>
          </div>
        )}
        <div className={"normal-layout-content"}>{this.props.children}</div>
      </div>
    );
  }
}
interface NormalNonAuthLayoutProps extends NonAuthComponentProps {
  children?: React.ReactNode;
}
export class NormalNonAuthLayout extends NonAuthComponent<
  NormalNonAuthLayoutProps,
  {}
> {
  render() {
    return <NormalLayoutComponent>{this.props.children}</NormalLayoutComponent>;
  }
}
export class NormalLayout extends AppComponent {
  render() {
    const menu = (
      <Menu>
        <Menu.Item>
          <PublicLink href={UU.userSettings.fill({})}>Settings</PublicLink>
        </Menu.Item>
        <Menu.Item
          onClick={async () => {
            await this.logout();
          }}
        >
          Sign Out
        </Menu.Item>
      </Menu>
    );
    return (
      <>
        <BrowserAlertBanner />
        <NormalLayoutComponent
          topBar={
            <div className={"normal-layout__top-bar-right"}>
              <HelpButton />
              <Dropdown overlay={menu} trigger={["click"]}>
                <div className={"normal-layout__user"}>
                  <Avatar
                    className={"user-avatar"}
                    user={ensure(this.appCtx().selfInfo, "must have selfInfo")}
                  />
                  <InlineIcon>
                    <Icon icon={ChevronDownsvgIcon} />
                  </InlineIcon>
                </div>
              </Dropdown>
            </div>
          }
        >
          {this.props.children}
        </NormalLayoutComponent>
      </>
    );
  }
}
