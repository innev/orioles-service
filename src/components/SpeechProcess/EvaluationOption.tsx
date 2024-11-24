import { actionConfirmTips } from '@/components/ModalMethod';
import { classNames } from '@/utils/classNames';
import { MicrophoneIcon, SignalIcon, SpeakerWaveIcon } from '@heroicons/react/24/outline';
import React, { useEffect, useRef, useState } from 'react';
import { IconButton } from '../iv-ui';

interface EvaluationProps {
  evalUpdate: any,
  data: any,
  evalType: any,
  wordIdex: any,
  clickAudio?: Function,
  clickStop?: Function,
  recordType: any,
  updateState: any,
  reset: any
}

export default ({ evalUpdate, data, evalType, wordIdex, clickAudio, clickStop, recordType, updateState, reset }: EvaluationProps) => {
  const audioRef = useRef()
  const audioDataRef = useRef()

  const [showEval, setShowEval] = useState(false)
  const [activeType, setActiveType] = useState('')

  // const { clickOptions } = usePlay({ plays: audioRef })

  // const { } = usePlay({ plays: audioDataRef })

  // const { deleteElements } = useFontColor({
  //   audioRef: audioRef,
  //   evalType: evalType,
  //   wordIdex: wordIdex,
  //   reset: reset
  // })

  useEffect(() => {
    if (recordType === 'wholestory' && wordIdex != 0 && activeType === 'volume') {
      setTimeout(() => {
        clickEvent('volume')
      }, 400);
    } else {
      setShowEval(false)
      setActiveType('')
    }
  }, [wordIdex, evalType, recordType, evalUpdate])

  useEffect(() => {
    const playsClick = (e:any) => {
      switch (e.detail.type) {
        case "play":
          setShowEval(true)
          break;
        case "pause":
          setActiveType('')
          setShowEval(false)
          playsPause()
          break;
        case "finish":
          setShowEval(false)
          if (activeType === 'volume' && recordType === 'wholestory') {
            updateParentState('wordIdex', (wordIdex: any) => {
              if (wordIdex >= data[evalType]?.length - 1) wordIdex = 0
              else wordIdex = wordIdex + 1
              return wordIdex
            })
          }
          break;
      }
    }
    // audioRef?.current && audioRef.current.addEventListener('playsUpdate', playsClick)
    // audioDataRef?.current && audioDataRef.current.addEventListener('playsUpdate', playsClick)
    // return () => {
    //   audioRef?.current && audioRef.current.removeEventListener('playsUpdate', playsClick)
    //   audioDataRef?.current && audioDataRef.current.removeEventListener('playsUpdate', playsClick)
    // }
  }, [audioRef, audioDataRef, recordType, activeType])


  const playsPause = () => {
    // if (audioRef) {
    //   audioRef.current.currentTime = 0
    //   audioRef.current.pause()
    // }
    // if (audioDataRef) {
    //   audioDataRef.current.currentTime = 0
    //   audioDataRef.current.pause()
    // }
  }

  const dipatchPause = () => {
    // audioRef?.current && playsDispatch(audioRef, 'pause')
    // audioDataRef?.current && playsDispatch(audioDataRef, 'pause')
  }

  const updateParentState = (type: any, value: any) => {
    // deleteElements()
    updateState(type, value)
  }

  const dispatchRecordAudio = () => {
    setShowEval(false)
    clickStop && clickStop()
  }

  const backCall = (type: any) => {
    dipatchPause()
    dispatchRecordAudio()
    updateState('wordIdex', 0)
    updateState('recordType', type)
  }

  const clickEvent = (type: any) => {
    dipatchPause()
    switch (type) {
      case 'volume':
        clickStop && clickStop()
        // if (!showEval || activeType != type) clickOptions('play')
        break;
      case 'record':
        // clickAudio()
        break;
      case 'yinpin':
        clickStop && clickStop()
        if (
          (recordType === 'wholestory' && data?.audioAllData)
          || (recordType != 'wholestory' && data[evalType][wordIdex]?.audioData)
        ) {
          // audioDataRef.current?.play();
        }
        break;
    }
    if (showEval && activeType === type) dipatchPause()
    else if (activeType === type) setShowEval(!showEval)
    else setShowEval(true)
    setActiveType(type)
  }

  const backAudio = (callBack: any) => {
    if (showEval && evalType === 'text' && recordType === 'wholestory') {
      let html = <div className="fs16 tc">
        确定要退出吗？<br />
        退出将不会保存学习记录
      </div>
      actionConfirmTips({
        text: html,
        onOk: () => callBack && callBack(),
        okText: '退出',
        okButtonProps: {
          size: 'large',
          className: "w100 lh26 text-color-white background backg-record bdrs100 b1F-not"
        },
        cancelText: '取消',
        cancelButtonProps: {
          size: 'large',
          className: "w100 lh26 text-color bdrs100 b1F"
        },
      })
    }
    else callBack && callBack()
  }

  return (
    <>
      {/* <audio
        ref={audioRef}
        src={data[evalType][wordIdex]?.src}
      ></audio>

      <audio
        ref={audioDataRef}
        src={
          recordType === 'wholestory'
            ? data?.audioAllData
            : data[evalType][wordIdex]?.audioData
        }
      ></audio> */}

      {
        evalType === 'text' &&
        (<>
          <div className="tc bdrs100 ps top22 background-color-primary-opacity14">
            <div
              // className={classNames("bdrs100 pointer ib w100 h40 lh40 fs14 text-primary", {'background text-color-white': recordType === 'wholestory'})}
              className={classNames("bdrs100 pointer ib w100 h40 lh40 fs14 text-primary")}
              onClick={() => backAudio(() => backCall('wholestory'))}
            >
              整篇测评
            </div>

            <div
              // className={classNames("bdrs100 pointer ib w100 h40 lh40 fs14 text-primary", {'background text-color-white': recordType === 'paragraph'})}
              className={classNames("bdrs100 pointer ib w100 h40 lh40 fs14 text-primary")}
              onClick={() => backAudio(() => backCall('paragraph'))}
            >
              段落测评
            </div>
            
          </div>
        </>)
      }

      {/* <IconVolume
        showNum={2}
        wrapperClass="vam"
        clickEvent={() => clickEvent('volume')}
        showEval={showEval}
        activeType={activeType}
      /> */}
      <IconButton
        icon={<SpeakerWaveIcon className="h-5 w-5 text-white" />}
        onClick={() => clickEvent('volume')}
      />
      {/* <IconRecord
        showNum={3}
        wrapperClass="w60 h60 ml80 vam"
        clickEvent={() => clickEvent('record')}
        dispatchAudio={() => dispatchRecordAudio()}
        showEval={showEval}
        activeType={activeType}
      /> */}
      <IconButton
        icon={<MicrophoneIcon className="h-5 w-5 text-white" />}
        onClick={() => clickEvent('record')}
      />
      {/* <IconYinpin
        showNum={5}
        wrapperClass="ml80 vam"
        clickEvent={() => clickEvent('yinpin')}
        audioData={
          recordType === 'wholestory'
            ? data?.audioAllData
            : data[evalType][wordIdex]?.audioData
        }
        showEval={showEval}
        activeType={activeType}
      /> */}
      <IconButton
        icon={<SignalIcon className="h-5 w-5 text-white" />}
        onClick={() => clickEvent('yinpin')}
      />
    </>
  )
};