import Container from "../../components/Container";
import UserLayout from "../../layouts/UserLayout";
import { Stepper, Step, StepLabel, Button } from "@mui/material";
import { useEffect, useState } from "react";
import BadgeIcon from "@mui/icons-material/Badge";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import { StepIconProps } from "@mui/material/StepIcon";
import { styled } from "@mui/material/styles";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import CCCDStep from "../../components/steps/CCCDStep";
import CertificateStep from "../../components/steps/CertificateStep";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        "linear-gradient( 95deg,rgb(6, 183, 56) 0%, rgb(8, 126, 18) 50%, rgb(35, 138, 61) 100%)",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        "linear-gradient( 95deg,rgb(6, 183, 56) 0%, rgb(8, 126, 18) 50%, rgb(35, 138, 61) 100%)",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled("div")<{
  ownerState: { completed?: boolean; active?: boolean };
}>(({ theme, ownerState }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? theme.palette.grey[700] : "#ccc",
  zIndex: 1,
  color: "#fff",
  width: 50,
  height: 50,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  ...(ownerState.active && {
    backgroundImage:
      "linear-gradient( 136deg, rgb(6, 183, 56) 0%, rgb(8, 126, 18) 50%, rgb(35, 138, 61) 100%)",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
  }),
  ...(ownerState.completed && {
    backgroundImage:
      "linear-gradient( 136deg, rgb(6, 183, 56) 0%, rgb(8, 126, 18) 50%, rgb(35, 138, 61) 100%)",
  }),
}));

function ColorlibStepIcon(props: StepIconProps) {
  const { active, completed, className } = props;

  const icons: { [index: string]: React.ReactElement } = {
    1: <BadgeIcon />,
    2: <WorkspacePremiumIcon />,
  };

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

const steps = ["Xác minh bản thân", "Xác minh chứng chỉ"];

const Certificate = () => {
  const navigator = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [cccdData, setCccdData] = useState({
    cccd_number: 0,
    real_name: "",
    dateOfBirth: "",
  });
  const [certificateData, setCertificateData] = useState([]);

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleNext = async () => {
    if (activeStep === 0) {
      console.log("cccd", cccdData);
    } else {
      console.log("certificate", certificateData);
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  // useEffect(() => {
  //   if (activeStep === steps.length) {
  //     navigator("/");
  //   }
  // }, [activeStep, navigator]);

  return (
    <UserLayout>
      <Container>
        <h1 className="text-slate-700 text-2xl font-bold my-3">
          Xác nhận chứng chỉ
        </h1>
        <Stepper
          alternativeLabel
          activeStep={activeStep}
          connector={<ColorlibConnector />}
        >
          {steps.map((label) => {
            return (
              <Step key={label}>
                <StepLabel StepIconComponent={ColorlibStepIcon}>
                  {label}
                </StepLabel>
              </Step>
            );
          })}
        </Stepper>
        <div>
          {activeStep === 0 ? (
            <CCCDStep onCCCDData={setCccdData} />
          ) : (
            <CertificateStep onAuthentic={setCertificateData} />
          )}
        </div>
        <div className="flex justify-between">
          <Button
            color="inherit"
            disabled={activeStep === 0}
            onClick={handleBack}
          >
            Trở lại
          </Button>
          <Button onClick={handleNext}>
            {activeStep === steps.length - 1 ? "Hoàn thành" : "Tiếp theo"}
          </Button>
        </div>
      </Container>
    </UserLayout>
  );
};

export default Certificate;
