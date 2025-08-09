import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Alert,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../contexts/AuthContext';
import DataExportService from '../services/dataExportService';
import AnalyticsService from '../services/analyticsService';
import LocalStorageService from '../services/localStorageService';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const DataManagementScreen: React.FC = () => {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [analyticsData, setAnalyticsData] = useState<any>(null);

  const loadAnalytics = async () => {
    try {
      const data = await AnalyticsService.getAnalyticsSummary();
      setAnalyticsData(data);
    } catch (error) {
      console.error('Error loading analytics:', error);
    }
  };

  React.useEffect(() => {
    loadAnalytics();
  }, []);

  const handleExportData = async () => {
    if (!currentUser) return;
    
    setLoading(true);
    try {
      await DataExportService.exportUserData();
      await AnalyticsService.trackDataExported('full', currentUser.id);
      Alert.alert('Success', 'Your data has been exported successfully!');
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to export data');
    } finally {
      setLoading(false);
    }
  };

  const handleExportNotes = async () => {
    if (!currentUser) return;
    
    setLoading(true);
    try {
      await DataExportService.exportUserNotes(currentUser.id);
      await AnalyticsService.trackDataExported('notes', currentUser.id);
      Alert.alert('Success', 'Your notes have been exported successfully!');
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to export notes');
    } finally {
      setLoading(false);
    }
  };

  const handleExportProgress = async () => {
    if (!currentUser) return;
    
    setLoading(true);
    try {
      await DataExportService.exportProgressSummary(currentUser.id);
      await AnalyticsService.trackDataExported('progress', currentUser.id);
      Alert.alert('Success', 'Your progress summary has been shared!');
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to export progress');
    } finally {
      setLoading(false);
    }
  };

  const handleImportData = async () => {
    setLoading(true);
    try {
      await DataExportService.importUserData();
      Alert.alert('Success', 'Your data has been imported successfully! Please restart the app.');
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to import data');
    } finally {
      setLoading(false);
    }
  };

  const handleClearAllData = () => {
    Alert.alert(
      'Clear All Data',
      'This will permanently delete all your progress, notes, and preferences. This cannot be undone!',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete All',
          style: 'destructive',
          onPress: async () => {
            try {
              await LocalStorageService.clearAllData();
              await AnalyticsService.clearAnalyticsData();
              Alert.alert('Success', 'All data has been cleared. Please restart the app.');
            } catch (error: any) {
              Alert.alert('Error', 'Failed to clear data');
            }
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>💾 Data Management</Text>
          <Text style={styles.headerSubtitle}>
            Your data is stored locally and private
          </Text>
        </View>

        {/* Privacy Info */}
        <Card style={styles.privacyCard}>
          <View style={styles.privacyHeader}>
            <Ionicons name="shield-checkmark" size={24} color="#10b981" />
            <Text style={styles.privacyTitle}>🏠 Local-First Privacy</Text>
          </View>
          <Text style={styles.privacyText}>
            All your data is stored only on this device. We cannot see your progress, 
            notes, or any personal information. Export regularly to keep backups!
          </Text>
        </Card>

        {/* Export Options */}
        <Card style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>📤 Export Your Data</Text>
          
          <View style={styles.exportOption}>
            <View style={styles.exportInfo}>
              <Text style={styles.exportTitle}>Complete Backup</Text>
              <Text style={styles.exportDescription}>
                Export all your progress, notes, and preferences as a JSON file
              </Text>
            </View>
            <Button
              title="Export All"
              onPress={handleExportData}
              disabled={loading}
              size="sm"
              style={styles.exportButton}
            />
          </View>

          <View style={styles.exportOption}>
            <View style={styles.exportInfo}>
              <Text style={styles.exportTitle}>Study Notes</Text>
              <Text style={styles.exportDescription}>
                Export your personal reflections and notes as a text file
              </Text>
            </View>
            <Button
              title="Export Notes"
              onPress={handleExportNotes}
              disabled={loading}
              variant="outline"
              size="sm"
              style={styles.exportButton}
            />
          </View>

          <View style={styles.exportOption}>
            <View style={styles.exportInfo}>
              <Text style={styles.exportTitle}>Progress Summary</Text>
              <Text style={styles.exportDescription}>
                Share your spiritual journey and reading achievements
              </Text>
            </View>
            <Button
              title="Share Progress"
              onPress={handleExportProgress}
              disabled={loading}
              variant="secondary"
              size="sm"
              style={styles.exportButton}
            />
          </View>
        </Card>

        {/* Import Options */}
        <Card style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>📥 Import Data</Text>
          <Text style={styles.sectionDescription}>
            Restore your data from a previously exported backup file
          </Text>
          <Button
            title="Import Backup File"
            onPress={handleImportData}
            disabled={loading}
            variant="outline"
            style={styles.importButton}
          />
        </Card>

        {/* Analytics Summary */}
        {analyticsData && (
          <Card style={styles.analyticsCard}>
            <Text style={styles.sectionTitle}>📊 Your Usage (Local Only)</Text>
            <View style={styles.analyticsGrid}>
              <View style={styles.analyticsStat}>
                <Text style={styles.analyticsNumber}>{analyticsData.totalSessions}</Text>
                <Text style={styles.analyticsLabel}>Sessions</Text>
              </View>
              <View style={styles.analyticsStat}>
                <Text style={styles.analyticsNumber}>{analyticsData.averageSessionDuration}</Text>
                <Text style={styles.analyticsLabel}>Avg Minutes</Text>
              </View>
              <View style={styles.analyticsStat}>
                <Text style={styles.analyticsNumber}>{analyticsData.mostUsedFeatures.length}</Text>
                <Text style={styles.analyticsLabel}>Features Used</Text>
              </View>
            </View>
            <Text style={styles.analyticsNote}>
              This data is stored only on your device and never shared
            </Text>
          </Card>
        )}

        {/* Danger Zone */}
        <Card style={styles.dangerCard}>
          <Text style={styles.dangerTitle}>⚠️ Danger Zone</Text>
          <Text style={styles.dangerDescription}>
            Permanently delete all your data from this device
          </Text>
          <Button
            title="Clear All Data"
            onPress={handleClearAllData}
            disabled={loading}
            variant="outline"
            style={styles.dangerButton}
          />
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#6b7280',
    marginTop: 4,
  },
  privacyCard: {
    marginHorizontal: 20,
    marginVertical: 10,
    backgroundColor: '#f0fdf4',
    borderColor: '#bbf7d0',
  },
  privacyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  privacyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#166534',
    marginLeft: 8,
  },
  privacyText: {
    fontSize: 14,
    color: '#166534',
    lineHeight: 20,
  },
  sectionCard: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 16,
  },
  exportOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  exportInfo: {
    flex: 1,
    marginRight: 12,
  },
  exportTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  exportDescription: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 2,
  },
  exportButton: {
    minWidth: 100,
  },
  importButton: {
    alignSelf: 'center',
  },
  analyticsCard: {
    marginHorizontal: 20,
    marginVertical: 10,
    backgroundColor: '#fefce8',
    borderColor: '#fde047',
  },
  analyticsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 16,
  },
  analyticsStat: {
    alignItems: 'center',
  },
  analyticsNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#a16207',
  },
  analyticsLabel: {
    fontSize: 12,
    color: '#a16207',
    marginTop: 4,
  },
  analyticsNote: {
    fontSize: 12,
    color: '#a16207',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  dangerCard: {
    marginHorizontal: 20,
    marginVertical: 10,
    marginBottom: 40,
    backgroundColor: '#fef2f2',
    borderColor: '#fca5a5',
  },
  dangerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#dc2626',
    marginBottom: 8,
  },
  dangerDescription: {
    fontSize: 14,
    color: '#dc2626',
    marginBottom: 16,
  },
  dangerButton: {
    alignSelf: 'center',
    borderColor: '#ef4444',
  },
});

export default DataManagementScreen;