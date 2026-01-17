import * as React from "react";
import { TreeView } from "@mui/x-tree-view/TreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useCallback, memo } from "react";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import { VscMarkdown, VscSettingsGear } from "react-icons/vsc";
import { MdExpandMore, MdChevronRight } from "react-icons/md";

interface Page {
  index: number;
  name: string;
  route: string;
}

interface Props {
  pages: {
    index: number;
    name: string;
    route: string;
  }[];
  selectedIndex: number;
  setSelectedIndex: React.Dispatch<React.SetStateAction<number>>;
  currentComponent: string;
  setCurrentComponent: React.Dispatch<React.SetStateAction<string>>;
  visiblePageIndexs: number[];
  setVisiblePageIndexs: React.Dispatch<React.SetStateAction<number[]>>;
}

function AppTree({
  pages,
  selectedIndex,
  setSelectedIndex,
  currentComponent,
  setCurrentComponent,
  visiblePageIndexs,
  setVisiblePageIndexs,
}: Props) {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery("(max-width:600px)");
  let { pathname } = useLocation();

  const page: Page = pages.find((x) => x.route === pathname)!;

  useEffect(() => {
    if (page) {
      setSelectedIndex(page.index);
    }
  }, [page, setSelectedIndex]);

  const isDark = theme.palette.mode === "dark";

  const getTreeItemBgColor = useCallback(
    (index: number) => {
      if (isDark) {
        return selectedIndex === index ? "rgba(144,202,249,0.16)" : "#252527";
      } else {
        return selectedIndex === index ? "#295fbf" : "#f3f3f3";
      }
    },
    [isDark, selectedIndex]
  );

  const getTreeItemColor = useCallback(
    (index: number) => {
      if (isDark) {
        return selectedIndex === index && currentComponent === "tree"
          ? "white"
          : "#bdc3cf";
      } else {
        return selectedIndex === index ? "#e2ffff" : "#69665f";
      }
    },
    [isDark, selectedIndex, currentComponent]
  );

  const handleHomeClick = useCallback(() => {
    navigate("/");
    setSelectedIndex(-1);
  }, [navigate, setSelectedIndex]);

  const handleItemClick = useCallback(
    (index: number, route: string) => {
      if (!visiblePageIndexs.includes(index)) {
        const newIndexs = [...visiblePageIndexs, index];
        setVisiblePageIndexs(newIndexs);
      }
      navigate(route);
      setSelectedIndex(index);
      setCurrentComponent("tree");
    },
    [
      visiblePageIndexs,
      setVisiblePageIndexs,
      navigate,
      setSelectedIndex,
      setCurrentComponent,
    ]
  );

  const treeItems = useMemo(
    () =>
      pages.map(({ index, name, route }) => {
        const getFileIcon = () => {
          if (route === "/settings") {
            return <VscSettingsGear color="#6997d5" />;
          }
          return <VscMarkdown color="#6997d5" />;
        };

        return (
          <TreeItem
            key={index}
            nodeId={index.toString()}
            label={name}
            sx={{
              color: getTreeItemColor(index),
              backgroundColor: getTreeItemBgColor(index),
              "&& .Mui-selected": {
                backgroundColor: getTreeItemBgColor(index),
              },
            }}
            icon={getFileIcon()}
            onClick={() => handleItemClick(index, route)}
          />
        );
      }),
    [pages, getTreeItemColor, getTreeItemBgColor, handleItemClick]
  );

  return (
    <TreeView
      aria-label="file system navigator"
      defaultCollapseIcon={<MdExpandMore />}
      defaultExpandIcon={<MdChevronRight />}
      sx={{ minWidth: isMobile ? 170 : 220 }}
      defaultExpanded={["-1"]}
    >
      <TreeItem
        nodeId="-1"
        label="Home"
        color="#bdc3cf"
        onClick={handleHomeClick}
      >
        {treeItems}
      </TreeItem>
    </TreeView>
  );
}

export default memo(AppTree);
