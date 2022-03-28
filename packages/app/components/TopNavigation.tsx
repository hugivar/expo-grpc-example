import React from 'react';
import { Icon, Text, TopNavigation, TopNavigationAction } from '@ui-kitten/components';

const BackIcon = (props: any) => (
  <Icon {...props} name='arrow-back'/>
);

const BackAction = () => (
  <TopNavigationAction icon={BackIcon}/>
);

export const TopNavigationView = () => (
  <TopNavigation
    accessoryLeft={BackAction}
    title={evaProps => <Text {...evaProps}>Title</Text>}
    subtitle={evaProps => <Text {...evaProps}>Subtitle</Text>}
  />
);




export default TopNavigationView;