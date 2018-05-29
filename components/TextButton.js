import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { purple } from '../utils/colors'

export default function TextButton({ children, onPress }) {
    return (
        <TouchableOpacity onPress={onPress}>
            <Text >{children}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    reset: {
        textAlign: 'center',
        color: purple,
    }
})