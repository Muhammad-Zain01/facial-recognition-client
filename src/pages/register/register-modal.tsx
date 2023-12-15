import { Button, Modal, Progress, Result, Spin } from "antd"
import React from "react";

type ComponentProps = {
    modalOpen: boolean;
    setModalOpen: (value: boolean) => void;
    state: number;
    percent: number;
}
const RegisterModal: React.FC<ComponentProps> = ({ modalOpen, setModalOpen, state, percent }) => {
    const onStop = () => {
        console.log("STOP")
    }
    console.log(percent);
    return (
        <div>
            <Modal
                open={modalOpen}
                centered
                width={600}
                onCancel={() => setModalOpen(false)}
                maskClosable={false}
                footer={
                    <div>
                        {
                            percent < 100 && (
                                <Button danger onClick={onStop}>Stop</Button>
                            )
                        }
                        {
                            percent == 100 && (
                                <Button onClick={() => setModalOpen(false)}>Stop</Button>
                            )
                        }
                    </div>
                }
            >
                <div>

                    <div style={{ display: 'flex', padding: '30px 10px 5px 10px', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        {
                            percent < 100 && (
                                <>
                                    <Spin size="large" />
                                    <p>Uploading...</p>
                                    <Progress percent={percent} />
                                </>
                            )
                        }
                        {
                            percent == 100 && (
                                <>
                                    <Spin size="large" />
                                    <p>Registering...</p>
                                </>
                            )
                        }
                        {
                            state == 2 && (
                                <>
                                    <Result
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