import { Button, Modal, Progress, Result, Spin } from "antd"
import React from "react";

type ComponentProps = {
    modalOpen: boolean;
    setModalOpen: (value: boolean) => void;
    state: number;
}
const RegisterModal: React.FC<ComponentProps> = ({ modalOpen, setModalOpen, state }) => {
    const onStop = () => {
        console.log("STOP")
    }
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
                            state === 0 && (
                                <Button danger onClick={onStop}>Stop</Button>
                            )
                        }
                        {
                            state === 2 && (
                                <Button onClick={() => setModalOpen(false)}>Close</Button>
                            )
                        }
                    </div>
                }
            >
                <div>

                    <div style={{ display: 'flex', padding: '30px 10px 5px 10px', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        {
                            state == 0 && (
                                <>
                                    <Spin size="large" />
                                    <p>Uploading...</p>
                                    <Progress percent={0} />
                                </>
                            )
                        }
                        {
                            state == 1 && (
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