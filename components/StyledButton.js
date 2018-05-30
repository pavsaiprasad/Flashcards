import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements';

export default (props) => <Button
    raised
    buttonStyle={{ marginTop: 10 }}
    {...props}
/>