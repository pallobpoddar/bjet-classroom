import React, { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, { AccordionSummaryProps } from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, IconButton, Divider, Grid } from "@mui/material";
import { Module } from "../../interfaces/moduleInterface";
import { Lesson } from "../../interfaces/lessonInterface";
import LessonCreationModal from "../modals/LessonCreationModal";
import TemporaryDrawer from "../drawers/TemporaryDrawer";
import LessonEditModal from "../modals/LessonEditModal"; // Import the new modal

type Props = {
  modules: Module[];
  open: boolean;
  toggleDrawer: () => void;
  title: string;
  refetch: () => void;
};

// Accordion styling
const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={1} square {...props} />
))(({ theme }) => ({
  borderRadius: "8px",
  margin: theme.spacing(2, 0),
  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
  border: `1px solid ${theme.palette.divider}`,
  "&:before": {
    display: "none",
  },
  "&:hover": {
    boxShadow: "0px 6px 14px rgba(0, 0, 0, 0.15)",
  },
}));

// Accordion summary styling
const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "1rem", color: "inherit" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.08)" : "rgba(240, 240, 240, 0.9)",
  padding: theme.spacing(2),
  flexDirection: "row-reverse",
  alignItems: "center",
  "&:hover": {
    backgroundColor: theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.15)" : "rgba(240, 240, 240, 1)",
  },
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(2),
    display: "flex",
    alignItems: "center",
  },
  "& .module-actions": {
    marginLeft: "auto",
    display: "flex",
    gap: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(3),
  borderTop: `1px solid ${theme.palette.divider}`,
}));

const ActionButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.primary.main,
  "&:hover": {
    backgroundColor: theme.palette.primary.light,
    color: "#fff",
  },
}));

const StyledLink = styled('a')(({ theme }) => ({
  color: theme.palette.primary.main,
  textDecoration: 'none',
  padding: theme.spacing(1),
  borderRadius: '4px',
  transition: 'background-color 0.2s, color 0.2s, box-shadow 0.2s',
  "&:hover": {
    backgroundColor: theme.palette.primary.light,
    color: "#fff",
    boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.2)",
  },
}));

const ModuleList: React.FC<Props> = (props) => {
  const theme = useTheme();
  const [expanded, setExpanded] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedModuleId, setSelectedModuleId] = useState<string>("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedModuleTitle, setSelectedModuleTitle] = useState("");

  // New state for lesson editing
  const [isLessonEditModalOpen, setIsLessonEditModalOpen] = useState(false);
  const [selectedLessonId, setSelectedLessonId] = useState("");
  const [selectedLessonTitle, setSelectedLessonTitle] = useState("");

  const handleAccordionChange = (panel: string) => {
    setExpanded((prevExpanded) =>
      prevExpanded.includes(panel)
        ? prevExpanded.filter((p) => p !== panel)
        : [...prevExpanded, panel]
    );
  };

  const handleOpenModal = (moduleId: string) => {
    setSelectedModuleId(moduleId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleLessonCreate = () => {
    props.refetch();
  };

  const handleOpenLessonEditModal = (lessonId: string, currentTitle: string) => {
    setSelectedLessonId(lessonId);
    setSelectedLessonTitle(currentTitle);
    setIsLessonEditModalOpen(true);
  };

  const handleCloseLessonEditModal = () => {
    setIsLessonEditModalOpen(false);
  };

  const handleOpenDrawer = (moduleId: string, title: string) => {
    setSelectedModuleId(moduleId);
    setSelectedModuleTitle(title);
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
  };

  return (
    <Box sx={{ width: "100%" }}>
      {props.modules.map((module, index) => (
        <Accordion
          key={module._id}
          expanded={expanded.includes(`module${index}`)}
          onChange={() => handleAccordionChange(`module${index}`)}
        >
          <AccordionSummary
            aria-controls={`module${index}d-content`}
            id={`module${index}d-header`}
          >
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              {module.title}
            </Typography>
            <Box className="module-actions">
              <ActionButton
                aria-label="add lesson"
                onClick={(event) => {
                  event.stopPropagation();
                  handleOpenModal(module._id);
                }}
              >
                <AddIcon />
              </ActionButton>
              <ActionButton
                aria-label="edit module"
                onClick={(event) => {
                  event.stopPropagation();
                  handleOpenDrawer(module._id, module.title);
                }}
              >
                <EditIcon />
              </ActionButton>
              <ActionButton
                aria-label="delete module"
                onClick={(event) => {
                  event.stopPropagation();
                  /* Handle delete */
                }}
              >
                <DeleteIcon />
              </ActionButton>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12}>
                {module.lessonRefs && module.lessonRefs.length > 0 ? (
                  module.lessonRefs.map((lesson: Lesson) => (
                    <Box key={lesson._id} sx={{ marginBottom: 2 }}>
                      <StyledLink href={lesson.content} target="_blank" rel="noopener noreferrer">
                        {lesson.title}
                      </StyledLink>
                      <IconButton
                        aria-label="edit lesson"
                        onClick={() => handleOpenLessonEditModal(lesson._id, lesson.title)}
                      >
                        <EditIcon />
                      </IconButton>
                      <Divider sx={{ marginY: 1 }} />
                    </Box>
                  ))
                ) : (
                  <Typography>No lessons available</Typography>
                )}
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      ))}

      <LessonCreationModal
        open={isModalOpen}
        onClose={handleCloseModal}
        onLessonCreate={handleLessonCreate}
        moduleId={selectedModuleId}
      />

      <LessonEditModal
        open={isLessonEditModalOpen}
        onClose={handleCloseLessonEditModal}
        lessonId={selectedLessonId}
        currentTitle={selectedLessonTitle}
        refetch={props.refetch}
      />

      <TemporaryDrawer
        open={drawerOpen}
        toggleDrawer={handleCloseDrawer}
        title="Edit Module"
        moduleId={selectedModuleId}
        refetch={props.refetch}
      />
    </Box>
  );
};

export default ModuleList;