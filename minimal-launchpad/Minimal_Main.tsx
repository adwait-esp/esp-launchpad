import { useEffect } from "react";
import { createRoot } from "react-dom/client";
import { Alert } from "@espressif/dashboard-ui-components";

import "../src/styles/globals.css";
import "../css/styles.css";
import "../css/custom.css";
import "../css/xterm.css";
import "./minimal_ui_styles.css";

export function MinimalMain() {
    const hasFlashConfigURL = new URLSearchParams(window.location.search).has("flashConfigURL");

    useEffect(() => {
        if (!hasFlashConfigURL) return;

        let cancelled = false;

        import("./minimal_ui_index.js").catch((error: unknown) => {
            if (!cancelled) {
                console.error("Failed to initialize Minimal Launchpad", error);
            }
        });

        return () => {
            cancelled = true;
        };
    }, [hasFlashConfigURL]);

    return (
        <div className="d-flex min-vh-100 w-100 flex-column align-items-center">
            {/* Modal for error troubleshoot starts */}
            <button
                type="button"
                id="errorTroubleshootModalToggleButton"
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#errorTroubleshootModal"
                hidden
            >
                Error Troubleshoot Modal Toggle Button
            </button>
            <div
                className="modal fade"
                id="errorTroubleshootModal"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabIndex={-1}
                aria-labelledby="errorTroubleshootModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="errorTroubleshootModalTitle">
                                Connection In Progress
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                                hidden
                            />
                        </div>
                        <div className="modal-body">
                            <p id="errorMessageDescription">
                                It&apos;s taking longer than usual for connecting the device.
                            </p>
                            <p className="errorMessage" id="errorMessage" style={{ display: "none" }} />
                            <p id="troubleshootAccordionLabel">
                                Refer to the troubleshooting guide below for assistance in resolving the issue.
                            </p>
                            <div className="accordion" id="troubleshootAccordion">
                                <div className="accordion-item border-0">
                                    <h2 className="accordion-header" id="headingOne">
                                        <button
                                            className="accordion-button collapsed"
                                            style={{ backgroundColor: "#eee" }}
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#collapseOne"
                                            aria-expanded="true"
                                            aria-controls="collapseOne"
                                        >
                                            Troubleshooting Guide
                                        </button>
                                    </h2>
                                    <div
                                        id="collapseOne"
                                        className="accordion-collapse collapse"
                                        aria-labelledby="headingOne"
                                        data-bs-parent="#troubleshootAccordion"
                                    >
                                        <div className="accordion-body" style={{ fontSize: "12px" }}>
                                            <div className="container mt-2">
                                                <div>
                                                    <div className="col-xs-12">
                                                        <div className="col-xs-12 mt-2">
                                                            <h4 className="topic mb-2" style={{ fontSize: "14px" }}>
                                                                <b>Device Connection Issue</b>
                                                            </h4>
                                                            <p>
                                                                If your device is not shown in list that pop-up while
                                                                connection establishing step then your device might be
                                                                not connected properly to port or their might be the{" "}
                                                                <strong>browser compatability issue</strong>. Please
                                                                ensure that it is properly connected to the port.
                                                                Reseating connection cable might also helps to resolve
                                                                this issue. If your device is connected to any other
                                                                application, please disconnect it and try again.
                                                            </p>
                                                        </div>
                                                        <div className="col-xs-12 mt-2">
                                                            <h4 className="topic mb-2" style={{ fontSize: "14px" }}>
                                                                <b>Serial Data Transmission Permission Issue</b>
                                                            </h4>
                                                            <div className="mb-3">
                                                                For linux users, the currently logged in user should have
                                                                read and write access the serial port over USB. On most
                                                                Linux distributions, this is done by adding the user to
                                                                dialout group with the following command:
                                                                <div className="command-snippet">
                                                                    {" "}
                                                                    usermod -a -G dialout $USER{" "}
                                                                </div>
                                                                on Arch Linux this is done by adding the user to uucp
                                                                group with the following command:
                                                                <div className="command-snippet">
                                                                    {" "}
                                                                    sudo usermod -a -G uucp $USER{" "}
                                                                </div>
                                                                Make sure you re-login to enable read and write
                                                                permissions for the serial port.
                                                            </div>
                                                        </div>
                                                        <div className="col-xs-12 mt-2">
                                                            <h4 className="topic mb-2" style={{ fontSize: "14px" }}>
                                                                <b>Browser Compatability Issue</b>
                                                            </h4>
                                                            <p>
                                                                <span style={{ color: "#e63f36" }}>
                                                                    Your browser of choice doesn&apos;t support the
                                                                    WebSerial API.
                                                                </span>{" "}
                                                                ESP Launchpad makes use of WebSerial to communicate with
                                                                the device. Please check the list of supported browsers{" "}
                                                                <a
                                                                    href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Serial_API#browser_compatibility"
                                                                    target="_blank"
                                                                    rel="noopener"
                                                                >
                                                                    here
                                                                </a>
                                                                .
                                                            </p>
                                                        </div>
                                                        <div className="col-xs-12 mt-2">
                                                            <h4 className="topic mb-2" style={{ fontSize: "14px" }}>
                                                                <b>Insecure Context Issue</b>
                                                            </h4>
                                                            <p>
                                                                <span style={{ color: "#e63f36" }}>
                                                                    ESP Launchpad was loaded over HTTP.
                                                                </span>{" "}
                                                                ESP Launchpad makes use of WebSerial to communicate with
                                                                the device. The WebSerial API only works in a secure
                                                                context (HTTPS or localhost). Please open ESP Launchpad
                                                                via HTTPS or localhost.{" "}
                                                                <a
                                                                    href="https://developer.mozilla.org/en-US/docs/Web/Security/Secure_Contexts"
                                                                    target="_blank"
                                                                    rel="noopener"
                                                                >
                                                                    Learn more
                                                                </a>
                                                                .
                                                            </p>
                                                        </div>
                                                        <div className="col-xs-12 mt-2">
                                                            <h4 className="topic mb-2" style={{ fontSize: "14px" }}>
                                                                <b>Device Compatability Issue</b>
                                                            </h4>
                                                            <p>
                                                                If you are using older devices or older versions of
                                                                device then sometimes you may face an issue in connection
                                                                establishing step or firmware flashing step. Please try
                                                                that steps by pressing boot button provided on device.
                                                                <details>
                                                                    <summary>
                                                                        List of devices that supported by ESP Launchpad
                                                                    </summary>
                                                                    <ol>
                                                                        <li>ESP32</li>
                                                                        <li>ESP32-C3</li>
                                                                        <li>ESP32-C6</li>
                                                                        <li>ESP32-H2</li>
                                                                        <li>ESP32-S2</li>
                                                                        <li>ESP32-S3</li>
                                                                        <li>ESP8266</li>
                                                                    </ol>
                                                                </details>
                                                            </p>
                                                        </div>
                                                        <div className="col-xs-12 mt-2" id="browserSupport">
                                                            <h4 className="topic mb-2" style={{ fontSize: "14px" }}>
                                                                <b>Driver Compatability Issue</b>
                                                            </h4>
                                                            <p>
                                                                It has been seen that on{" "}
                                                                <strong>windows system</strong> with latest{" "}
                                                                <strong>
                                                                    Silicon Lab CP210x USB to UART Bridge
                                                                </strong>{" "}
                                                                there are device connection or flashing issues.We are
                                                                looking into it to resolve the issue. You can still try
                                                                by downgrading silicon lab CP210x USB to UART Bridge
                                                                driver version to <code>6.7.x</code> that can resolve
                                                                issue on temporarily basis.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <hr />
                                                <div style={{ textAlign: "center" }}>
                                                    <p>
                                                        If you still unable to troubleshoot the problem or face any
                                                        other issues please report them on{" "}
                                                        <a
                                                            href="https://github.com/espressif/esp-launchpad/issues"
                                                            target="_blank"
                                                        >
                                                            ESP launchpad Issues
                                                        </a>
                                                    </p>
                                                    <p>We will be happy to help you resolve your issues !</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer border-top-0">
                            <div
                                className="field-container"
                                data-toggle="tooltip"
                                data-bs-placement="top"
                                title="You can wait some more time, and we'll continue to attempt the connection"
                                style={{ display: "inline-block" }}
                            >
                                <button
                                    type="button"
                                    className="app-button btn btn-outline-primary"
                                    data-bs-dismiss="modal"
                                    id="waitButton"
                                >
                                    Wait For Connection
                                </button>
                            </div>
                            <div
                                className="field-container"
                                data-toggle="tooltip"
                                data-bs-placement="top"
                                title="You can try it again !"
                                style={{ display: "inline-block" }}
                            >
                                <button
                                    type="button"
                                    className="app-button btn btn-outline-dark"
                                    onClick={() => window.location.reload()}
                                >
                                    Try Again
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Modal for error troubleshoot ends */}

            <div id="main" className="maincontainer container">
                {/* Responsive navbar */}
                <nav className="navbar navbar-expand-lg">
                    <div className="container">
                        <h4 className="topic" data-target-tab-panel-id="about">
                            <img src="../assets/logo-v1.png" className="logo" alt="" />
                        </h4>
                    </div>
                </nav>
                <div className="container" id="alert-container" style={{ display: "none" }}>
                    <div className="text-center mt-3 intro-text">
                        <div className="alert alert-warning alert-dismissible fade show" role="alert">
                            <label style={{ display: "none" }} id="lblConnTo" />
                        </div>
                    </div>
                </div>
                <div
                    style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        textAlign: "center",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    {!hasFlashConfigURL && (
                        <div className="mb-4" style={{ maxWidth: "40rem" }}>
                            <Alert type="error" variant="soft">
                                Unable to access the TOML file. Please ensure that you have provided the correct TOML
                                file link to the flashConfigURL parameter.
                            </Alert>
                        </div>
                    )}
                    {/* App Icon and Name Section */}
                    <div
                        id="appIconWithNameContainer"
                        style={{ display: "none", marginBottom: "20px" }}
                    >
                        <div style={{ marginBottom: "10px", display: "none" }} id="appIconDiv">
                            <img
                                id="appIcon"
                                src=""
                                alt="App Icon"
                                style={{
                                    maxWidth: "150px",
                                    maxHeight: "150px",
                                    objectFit: "contain",
                                }}
                            />
                        </div>
                        <div>
                            <a
                                href="#"
                                id="appNameLink"
                                role="button"
                                data-bs-toggle="offcanvas"
                                data-bs-target="#offcanvasRight"
                                aria-controls="offcanvasRight"
                                style={{
                                    fontSize: "18px",
                                    fontWeight: 500,
                                    textDecoration: "none",
                                }}
                            >
                                <span id="appName" />
                            </a>
                        </div>
                    </div>
                    {/* Connect Button */}
                    <button className="connectButton" id="connectButton" tabIndex={0} type="button" disabled>
                        Connect Your Device
                        <span className="span-svg">
                            <svg
                                className="svg"
                                focusable="false"
                                aria-hidden="true"
                                viewBox="0 0 24 24"
                                data-testid="EastIcon"
                            >
                                <path
                                    fill="#FFFFFF"
                                    d="m15 5-1.41 1.41L18.17 11H2v2h16.17l-4.59 4.59L15 19l7-7-7-7z"
                                />
                            </svg>
                        </span>
                    </button>
                </div>
                <div id="spinner" style={{ display: "none", position: "absolute", top: "50%" }}>
                    <div>
                        <div className="spinner-grow text-secondary bg-opacity-25" role="status">
                            <span className="sr-only" />
                        </div>
                        <div className="spinner-grow text-secondary bg-opacity-50" role="status">
                            <span className="sr-only" />
                        </div>
                        <div className="spinner-grow text-secondary bg-opacity-75" role="status">
                            <span className="sr-only" />
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row split">
                        <div className="productinfocontainer" id="productInfoContainer">
                            <div id="message" style={{ display: "none" }} />
                        </div>
                        <div
                            className="col-12 terminalcontainer"
                            style={{ overflow: "hidden", display: "none" }}
                            id="terminalContainer"
                        >
                            <div className="button-container text-end mb-sm-3">
                                <div
                                    className="field-container"
                                    data-toggle="tooltip"
                                    data-placement="right"
                                    title="Restart your device"
                                    style={{ display: "inline-block" }}
                                >
                                    <button
                                        type="button"
                                        className="app-button btn btn-outline-dark"
                                        id="consoleStartButton"
                                        disabled
                                    >
                                        Restart Device
                                    </button>
                                </div>
                            </div>
                            <div id="terminal">
                                <span className="devicelog">Device Console</span>
                            </div>
                            <div id="commandForm" style={{ display: "none" }}>
                                <textarea
                                    rows={1}
                                    className="form-control rounded-0 shadow-none"
                                    autoComplete="off"
                                    id="commandInput"
                                    placeholder="Type your command and press enter"
                                    style={{ fontSize: "14px", fontFamily: "monospace" }}
                                    disabled
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Offcanvas for Application Information */}
                <div
                    className="offcanvas offcanvas-end w-50"
                    tabIndex={-1}
                    id="offcanvasRight"
                    aria-labelledby="offcanvasRightLabel"
                >
                    <div className="offcanvas-body">
                        <div id="appInfo" />
                    </div>
                </div>
            </div>

            <div
                id="webSerialSupportErrorContainer"
                className="d-none d-flex flex-grow-1 w-100 flex-column justify-content-center align-items-center px-3"
            >
                <div id="unsupportedBrowserErr" className="web-serial-support-error-message d-none">
                    <p className="text-danger text-center mb-0">
                        Your browser of choice doesn&apos;t support the WebSerial API. ESP Launchpad makes use of
                        WebSerial to communicate with the device. Please check the list of supported browsers{" "}
                        <a
                            href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Serial_API#browser_compatibility"
                            target="_blank"
                            rel="noopener"
                        >
                            here
                        </a>
                        .
                    </p>
                </div>
                <div id="unsupportedInsecureContextErr" className="web-serial-support-error-message d-none">
                    <p className="text-danger text-center mb-0">
                        ESP Launchpad makes use of WebSerial to communicate with the device. The WebSerial API only
                        works in a secure context (HTTPS or localhost). This page was loaded over an insecure connection
                        (HTTP). Please open ESP Launchpad via HTTPS or localhost.{" "}
                        <a
                            href="https://developer.mozilla.org/en-US/docs/Web/Security/Secure_Contexts"
                            target="_blank"
                            rel="noopener"
                        >
                            Learn more about secure contexts
                        </a>
                        .
                    </p>
                </div>
            </div>

            <footer className="mt-auto py-3 w-100">
                <div className="container text-center">
                    <span className="text-muted">Copyright © 2026 Espressif Systems</span>
                </div>
            </footer>
        </div>
    );
}

createRoot(document.getElementById("root")!).render(<MinimalMain />);
