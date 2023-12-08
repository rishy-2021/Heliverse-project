import React, { FC, useRef, useState } from 'react';
import type { DraggableData, DraggableEvent } from 'react-draggable';
import Draggable from 'react-draggable';
import { Button, Checkbox, Input, Modal, Select, SelectProps } from 'antd';
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import { AiOutlineUsergroupAdd } from "react-icons/ai";

export const AddTeamsModal: FC<{buttonDisabled:boolean, onCancel:(query:[])=> void}> = ({buttonDisabled, onCancel}) => {
  const [open, setOpen] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [genderCheckedList, setGenderCheckedList] = useState<CheckboxValueType[]>([]);
  const [presenceCheckedList, setPresenceCheckedList] = useState<CheckboxValueType[]>([]);
  const [bounds, setBounds] = useState({ left: 0, top: 0, bottom: 0, right: 0 });
  const draggleRef = useRef<HTMLDivElement>(null);
  const genderOptions = ['Male', 'Female', 'Others'];
  const presenceOptions = ['Available', 'Unavailable'];

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e);
    setOpen(false);
  };

  const handleCancel = (e: React.MouseEvent<HTMLElement>) => {
    setOpen(false);
    onCancel([])
  };

  const onStart = (_event: DraggableEvent, uiData: DraggableData) => {
    const { clientWidth, clientHeight } = window.document.documentElement;
    const targetRect = draggleRef.current?.getBoundingClientRect();
    if (!targetRect) {
      return;
    }
    setBounds({
      left: -targetRect.left + uiData.x,
      right: clientWidth - (targetRect.right - uiData.x),
      top: -targetRect.top + uiData.y,
      bottom: clientHeight - (targetRect.bottom - uiData.y),
    });
  };

  return (
    <>
       <Button size='large' className='flex items-center' icon={<AiOutlineUsergroupAdd />} onClick={showModal} disabled={buttonDisabled}>Add</Button>
      <Modal
        title={
          <div
            style={{
              width: '100%',
              cursor: 'move',
            }}
            onMouseOver={() => {
              if (disabled) {
                setDisabled(false);
              }
            }}
            onMouseOut={() => {
              setDisabled(true);
            }}
            onFocus={() => {}}
            onBlur={() => {}}
          >
            Create Teams
          </div>
        }
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        okText={'Save'}
        okType='default'
        modalRender={(modal) => (
          <Draggable
            disabled={disabled}
            bounds={bounds}
            nodeRef={draggleRef}
            onStart={(event, uiData) => onStart(event, uiData)}
          >
            <div ref={draggleRef}>{modal}</div>
          </Draggable>
        )}
      >
        <div className='flex flex-row items-center mt-5'>
        <p className='mr-5 font-semibold'>Name : </p>
        <Input style={{width:"80%"}} placeholder="Basic usage" />
        </div>
        <div className='flex flex-row mt-4'>
        <p className='mr-5 font-semibold'>Students : </p>
        <Checkbox.Group options={presenceOptions} value={presenceCheckedList} onChange={()=>{}} />
        </div>
      </Modal>
    </>
  );
};