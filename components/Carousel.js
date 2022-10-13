import React, { useState, useRef } from "react";
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import { Dimensions } from "react-native";
import styled, { css } from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";

// 참고영상: https://www.youtube.com/watch?v=otr_x0wKgvU

const screen = Dimensions.get("screen");
const imageWidth = screen.width - 2; // 2px => border width.
const imageHeight = screen.height * 0.4;

const Container = styled.View`
  width: ${imageWidth}px;
  height: ${imageHeight}px;
  position: relative;
  align-items: center;
  justify-content: center;
`;

const ImageContainer = styled.ScrollView`
  width: 100%;
  height: 100%;
`;

const Photo = styled.Image`
  width: ${imageWidth}px;
  height: ${imageHeight}px;
`;

const IndexContainer = styled.View`
  position: absolute;
  align-items: center;
  padding: 10px;
  width: ${imageWidth}px;
  bottom: 0px;
  left: 0px;
  align-self: center;
  justify-content: center;
  flex-direction: row;
`;

const IndexItem = styled.Text`
  ${(props) =>
    props.selected
      ? css`
          color: rgba(255, 255, 255, 1);
          font-size: 24px;
        `
      : css`
          color: rgba(255, 255, 255, 0.5);
          font-size: 18px;
        `};
  ${(props) =>
    !props.last &&
    css`
      margin-right: 5px;
    `}
`;

const ActContainer = styled.View`
  position: absolute;
  width: 100%;
  padding-left: 10px;
  padding-right: 10px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const ActButton = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
`;

const ActIcon = styled.Text`
  color: rgba(200, 200, 200, 0.8);
`;

export const Carousel = ({ images }) => {
  const [index, setIndex] = useState(0);
  const scrollViewRef = useRef < ScrollView > null;
  const length = images.length;
  const onScrollHorizontal = (event) => {
    const {
      nativeEvent: { contentOffset, layoutMeasurement },
    } = event;
    const scrolledIndex = Math.ceil(contentOffset.x / layoutMeasurement.width);
    const upperLimited =
      scrolledIndex > length - 1 ? length - 1 : scrolledIndex;
    const lowerLimited = upperLimited < 0 ? 0 : upperLimited;
    setIndex(lowerLimited);
  };

  const scrollTo = (toIndex) => {
    if (scrollViewRef) {
      scrollViewRef.current?.scrollTo({ x: toIndex * (imageWidth-1), y: 0 });
    }
  };

  const onNext = () => {
    const nextIndex = index >= images.length - 1 ? 0 : index + 1;
     setIndex(nextIndex);
    scrollTo(nextIndex);
  };
  const onPrev = () => {
    const prevIndex = index === 0 ? images.length - 1 : index - 1;
    setIndex(prevIndex);
    scrollTo(prevIndex);
  };
  const onScrollTo = (toIndex) => () => {
    if (toIndex !== index) {
      scrollTo(toIndex);
      setIndex(toIndex);
    }
  };

  return (
    <Container>
      {/* @ts-ignore */}
      <ImageContainer
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={onScrollHorizontal}
      >
        {images.map((image) => (
          <Photo
            source={{ uri: image }}
            key={`Photo:${image}`}
            resizeMode="cover"
          />
        ))}
      </ImageContainer>
      <ActContainer>
        <ActButton onPressIn={onPrev}>
          <ActIcon>
            <Ionicons
              name="arrow-back-circle"
              color="rgba(255,255,255,0.9)"
              size={40}
            />
          </ActIcon>
        </ActButton>
        <ActButton onPress={onNext}>
          <ActIcon>
            <Ionicons
              name="arrow-forward-circle"
              color="rgba(255,255,255,0.9)"
              size={40}
            />
          </ActIcon>
        </ActButton>
      </ActContainer>
      <IndexContainer>
        {images.map((image, i) => (
          <TouchableWithoutFeedback
            key={`${image}-${i}`}
            onPress={onScrollTo(i)}
          >
            <IndexItem last={i === images.length - 1} selected={i === index}>
              ●
            </IndexItem>
          </TouchableWithoutFeedback>
        ))}
      </IndexContainer>
    </Container>
  );
};
