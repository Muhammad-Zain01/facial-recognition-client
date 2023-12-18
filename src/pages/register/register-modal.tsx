import { Button, Modal, Progress, Result, Spin } from "antd"
import React from "react";

type ComponentProps = {
    modalOpen: boolean;
    state: number;
    percent: number;
    reset: () => void;
    startRegister : () => void
}
const RegisterModal: React.FC<ComponentProps> = ({ modalOpen, reset, state, percent, startRegister }) => {

    return (
        <div>
            <Modal
                open={modalOpen}
                centered
                width={600}
                onCancel={reset}
                maskClosable={false}
                footer={
                    <>
                        {
                            state === 3 && (
                                <Button onClick={() => reset()}>close</Button>
                            )
                        }
                    </>
                }
            >
                <div>

                    <div style={{ display: 'flex', padding: '30px 10px 5px 10px', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        {
                            state == 4 && (
                                <>
                                    <Spin size="large" />
                                    <p>Registering...</p>
                                </>
                            )
                        }
                        {
                            state == 0 && (
                                <>
                                    <Spin size="large" />
                                    <p>Uploading...</p>
                                    <Progress percent={percent} />
                                </>
                            )
                        }
                        {
                            state == 1 && (
                                <>
                                    <Result
                                        style={{ margin: 0, padding: 0 }}
                                        status="success"
                                        title="Uploaded Successfully"
                                        extra={
                                            <Button
                                                type="primary"
                                                onClick={startRegister}
                                            >
                                                Register
                                            </Button>
                                        }
                                    />
                                </>
                            )
                        }
                        {
                            state == 2 && (
                                <>
                                    <Result
                                        style={{ margin: 0, padding: 0 }}
                                        status="warning"
                                        title="Something Went Wrong"
                                    />
                                </>
                            )
                        }
                        {
                            state == 3 && (
                                <>
                                    <Result
                                        style={{ margin: 0, padding: 0 }}
                                        status="success"
                                        title="Registered successfully"
                                    />
                                </>
                            )
                        }

                    </div>
                </div>

            </Modal>
        </div>
    )
}

export default RegisterModal