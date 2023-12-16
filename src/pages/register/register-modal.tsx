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
                    <>
                        {
                            state === 3 && (
                                <Button onClick={() => setModalOpen(false)}>close</Button>
                            )
                        }
                    </>
                }
            >
                <div>

                    <div style={{ display: 'flex', padding: '30px 10px 5px 10px', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
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
                                            <Button type="primary">
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