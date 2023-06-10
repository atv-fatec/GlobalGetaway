import { ScrollView, Dimensions, Animated, View, Image } from "react-native";
import React, { useRef } from "react";

const { width } = Dimensions.get("window");

export const Carrossel = ({
    arrayImages,
}) => {
    const scrollX = useRef(new Animated.Value(0)).current;
    let position = Animated.divide(scrollX, width);
    return (
        <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
            <View style={{ width, height: width }}>
                <ScrollView
                    horizontal={true}
                    pagingEnabled={true}
                    showsHorizontalScrollIndicator={false}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                        { useNativeDriver: false }
                    )}
                    scrollEventThrottle={16}
                >
                    {arrayImages
                        ? arrayImages.map((image, index) => {
                            return (
                                <Image
                                    key={index}
                                    source={{ uri: image.url }}
                                    style={{ width, height: width }}
                                />
                            );
                        })
                        : null}
                </ScrollView>
            </View>
        </View>
    );
};