import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { X, Type, Eye, Maximize } from 'lucide-react';

const AccessibilityPanel = ({ isOpen, onClose }) => {
  const [settings, setSettings] = useState({
    fontSize: 'normal',
    contrast: 'normal',
    spacing: 'normal'
  });

  useEffect(() => {
    // Load saved settings from localStorage
    const savedSettings = localStorage.getItem('accessibility-settings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  useEffect(() => {
    // Apply settings to document body
    const body = document.body;
    
    // Remove existing classes
    body.classList.remove('large-text-mode', 'high-contrast-mode', 'increased-spacing-mode');
    
    // Apply current settings
    if (settings.fontSize === 'large') {
      body.classList.add('large-text-mode');
    }
    if (settings.contrast === 'high') {
      body.classList.add('high-contrast-mode');
    }
    if (settings.spacing === 'increased') {
      body.classList.add('increased-spacing-mode');
    }
    
    // Save settings to localStorage
    localStorage.setItem('accessibility-settings', JSON.stringify(settings));
  }, [settings]);

  const updateSetting = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const resetSettings = () => {
    setSettings({
      fontSize: 'normal',
      contrast: 'normal',
      spacing: 'normal'
    });
  };

  if (!isOpen) return null;

  return (
    <div className={`accessibility-panel ${isOpen ? 'open' : ''}`}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="heritage-serif text-lg font-semibold text-primary">
          Accessibility Settings
        </h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="touch-target focus-visible:focus-visible"
          aria-label="Close accessibility panel"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-4">
        {/* Font Size */}
        <div>
          <div className="flex items-center mb-2">
            <Type className="h-4 w-4 mr-2 text-primary" />
            <label className="heritage-sans text-sm font-medium">Font Size</label>
          </div>
          <div className="flex gap-2">
            <Button
              variant={settings.fontSize === 'normal' ? 'default' : 'outline'}
              size="sm"
              onClick={() => updateSetting('fontSize', 'normal')}
              className="touch-target focus-visible:focus-visible"
            >
              Normal
            </Button>
            <Button
              variant={settings.fontSize === 'large' ? 'default' : 'outline'}
              size="sm"
              onClick={() => updateSetting('fontSize', 'large')}
              className="touch-target focus-visible:focus-visible"
            >
              Large
            </Button>
          </div>
        </div>

        {/* Contrast */}
        <div>
          <div className="flex items-center mb-2">
            <Eye className="h-4 w-4 mr-2 text-primary" />
            <label className="heritage-sans text-sm font-medium">Contrast</label>
          </div>
          <div className="flex gap-2">
            <Button
              variant={settings.contrast === 'normal' ? 'default' : 'outline'}
              size="sm"
              onClick={() => updateSetting('contrast', 'normal')}
              className="touch-target focus-visible:focus-visible"
            >
              Normal
            </Button>
            <Button
              variant={settings.contrast === 'high' ? 'default' : 'outline'}
              size="sm"
              onClick={() => updateSetting('contrast', 'high')}
              className="touch-target focus-visible:focus-visible"
            >
              High
            </Button>
          </div>
        </div>

        {/* Spacing */}
        <div>
          <div className="flex items-center mb-2">
            <Maximize className="h-4 w-4 mr-2 text-primary" />
            <label className="heritage-sans text-sm font-medium">Spacing</label>
          </div>
          <div className="flex gap-2">
            <Button
              variant={settings.spacing === 'normal' ? 'default' : 'outline'}
              size="sm"
              onClick={() => updateSetting('spacing', 'normal')}
              className="touch-target focus-visible:focus-visible"
            >
              Normal
            </Button>
            <Button
              variant={settings.spacing === 'increased' ? 'default' : 'outline'}
              size="sm"
              onClick={() => updateSetting('spacing', 'increased')}
              className="touch-target focus-visible:focus-visible"
            >
              Increased
            </Button>
          </div>
        </div>

        {/* Reset Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={resetSettings}
          className="w-full touch-target focus-visible:focus-visible"
        >
          Reset to Defaults
        </Button>
      </div>

      <div className="mt-4 pt-4 border-t border-border">
        <p className="heritage-sans text-xs text-muted-foreground">
          These settings are saved locally and will persist across visits.
        </p>
      </div>
    </div>
  );
};

export default AccessibilityPanel;

