import React, { Fragment, useContext, useEffect } from "react";
import { withAlert } from "react-alert";
import { useAlert } from "react-alert";
import { AlertContext } from "../contexts/AlertContext";
import { useIsMount } from "../customHooks/useIsMount";

const Alert = () => {
  const alert = useAlert();
  const isMount = useIsMount();
  const { successMessage, errorMessage } = useContext(AlertContext);

  useEffect(() => {
    !isMount && alert.error(errorMessage);
  }, [errorMessage]);

  useEffect(() => {
    !isMount && alert.success(successMessage);
  }, [successMessage]);

  return <Fragment />;
};

export default withAlert()(Alert);
