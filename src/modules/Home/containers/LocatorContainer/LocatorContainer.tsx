import React, { useEffect } from 'react';
import { Dimensions, FlatList, StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

import { useTheme } from '@providers';
import { ActivityLoader, EmptyList, Header } from '@shared/components';
import { SiteInfoCard } from '../../components/components';
import { useLocator } from '../../hooks/hooks';
import { styles } from './LocatorContainer.styles';

const { width } = Dimensions.get('screen');
const _cardWidth = width * 0.85;
const _spacing = 12;

const LocatorContainer = () => {
  const { THEME_COLOR } = useTheme();
  const Styles = styles({ THEME_COLOR });
  const { t } = useTranslation();
  const {
    projects,
    loading,
    page,
    selectedProject,
    mapRef,
    flatListRef,
    loadMore,
    handleCardPress,
  } = useLocator();

  useEffect(() => {
    if (projects.length > 0 && mapRef.current) {
      const coords = projects
        .map(p => ({
          latitude: parseFloat(p?.location_coordinates?.latitude ?? '0'),
          longitude: parseFloat(p?.location_coordinates?.longitude ?? '0'),
        }))
        .filter(c => c.latitude && c.longitude);
      if (coords.length > 0) {
        mapRef.current.fitToCoordinates(coords, {
          edgePadding: { top: 100, right: 100, bottom: 300, left: 100 },
          animated: true,
        });
      }
    }
  }, [projects]);
  
  return (
    <View style={Styles.container}>
      <View style={Styles.headerWrapper}>
        <Header showLeftContainer variant="simple" />
      </View>

      {loading ? (
        <ActivityLoader fullscreen />
      ) : projects.length > 0 && selectedProject ? (
        <>
          <MapView
            ref={mapRef}
            style={StyleSheet.absoluteFillObject}
            region={{
              latitude: parseFloat(
                selectedProject?.location_coordinates?.latitude ?? '0',
              ),
              longitude: parseFloat(
                selectedProject?.location_coordinates?.longitude ?? '0',
              ),
              latitudeDelta: 2.05,
              longitudeDelta: 2.05,
            }}
            provider={PROVIDER_GOOGLE}>
            {projects.map((proj, idx) => {
              const lat = parseFloat(
                proj?.location_coordinates?.latitude ?? '0',
              );
              const lng = parseFloat(
                proj?.location_coordinates?.longitude ?? '0',
              );

              if (!lat || !lng) return null;
              
              return (
                <Marker
                  key={proj.id}
                  coordinate={{ latitude: lat, longitude: lng }}
                  onPress={() => handleCardPress(proj, idx)}
                  // image={require('./image.png')}
                  // icon={require('./image.png')}
                  // pinColor='green'
                />
              );
            })}
          </MapView>

          <View style={Styles.cardContainer}>
            <FlatList
              ref={flatListRef}
              data={projects}
              keyExtractor={item => String(item.id)}
              horizontal
              showsHorizontalScrollIndicator={false}
              snapToInterval={_cardWidth + _spacing}
              decelerationRate="fast"
              contentContainerStyle={{
                paddingHorizontal: (width - _cardWidth) / 2,
                gap: _spacing,
              }}
              renderItem={({ item, index }) => (
                <SiteInfoCard
                  project={item}
                  onPress={() => handleCardPress(item, index)}
                />
              )}
              onEndReached={loadMore}
              // onEndReachedThreshold={0.5}
              ListFooterComponent={
                loading && page > 1 ? (
                  <View style={{ marginVertical: 20 }}>
                    <ActivityLoader />
                  </View>
                ) : null
              }
            />
          </View>
        </>
      ) : (
        <EmptyList text={t('Label.NoProjectsFound')} />
      )}
    </View>
  );
};

export default LocatorContainer;