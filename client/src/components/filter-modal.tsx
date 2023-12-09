import React, { FC, useRef, useState } from 'react';
import type { DraggableData, DraggableEvent } from 'react-draggable';
import Draggable from 'react-draggable';
import { Button, Checkbox, Modal, Select, SelectProps } from 'antd';
import { AiOutlineAlignLeft } from "react-icons/ai";

// interface Filter {
//   gender: [];
//   domain: [];
//   available: [];
// }

interface Props {
  onFilterChange:(filter:any)=> void
}

export const FilterModal: FC<Props> = ({onFilterChange}) => {
  const [open, setOpen] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [genderCheckedList, setGenderCheckedList] = useState<string[]>([]);
  const [presenceCheckedList, setPresenceCheckedList] = useState<string[]>([]);
  const [presenceListBoolean, setPresenceListBoolean] = useState<boolean[]>([]);
  const [domainList, setDomainList] = useState<string[]>([]);
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
    onFilterChange({
      gender:genderCheckedList,
      available:presenceListBoolean,
      domain:domainList
    })
  };
  console.log(presenceListBoolean, presenceCheckedList);

  const handleCancel = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e);
    setOpen(false);
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

  const onGenderChange = (list: string[] | string[]) => {
    setGenderCheckedList(list);
  };

  const onPresenceChange = (list: string[]) => {
    setPresenceCheckedList(list)
    if(list.length ===0 || list.length===2){
      setPresenceListBoolean([true, false]);
    } else {
      if(list[0] === 'Available'){
        setPresenceListBoolean([true]);
      } else {
        setPresenceListBoolean([false]);
      }
    }
  };

  const options: SelectProps['options'] = [];

  return (
    <>
      <Button size='large' className='flex items-center' icon={<AiOutlineAlignLeft />} onClick={showModal}>Filters</Button>
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
            Filters
          </div>
        }
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        okText={'Search'}
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
        <div className='flex flex-row mt-5'>
        <p className='mr-5 font-semibold'>Gender : </p>
        <Checkbox.Group options={genderOptions} value={genderCheckedList} onChange={(val) =>onGenderChange(val as string[])} />
        </div>
        <div className='flex flex-row mt-4'>
        <p className='mr-5 font-semibold'>Present : </p>
        <Checkbox.Group options={presenceOptions} value={presenceCheckedList}
        onChange={(val)=>onPresenceChange(val as string[])}
         />
        </div>
        <div className='flex flex-row items-center mt-4'>
        <p className='mr-5 font-semibold'>Domain : </p>
        <Select
            mode="tags"
            style={{ width: '80%' }}
            onChange={setDomainList}
            tokenSeparators={[',']}
            options={options}
            size='large'
        />
        </div>
      </Modal>
    </>
  );
};