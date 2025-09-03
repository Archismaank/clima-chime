import React from 'react';
import { Alert } from '@/services/weatherService';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle } from 'lucide-react';

interface AlertsPanelProps {
  alerts: Alert[];
}

const AlertsPanel: React.FC<AlertsPanelProps> = ({ alerts }) => {
  if (alerts.length === 0) {
    return (
      <Card className="shadow-lg bg-card border-border">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-green-500" />
            Weather Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4">
            <div className="text-2xl mb-2">✅</div>
            <div className="text-muted-foreground">All clear! No weather alerts</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const getAlertStyle = (type: string) => {
    switch (type) {
      case 'rain':
        return 'bg-rainy/10 border-rainy/30 text-rainy-foreground';
      case 'heat':
        return 'bg-alert/10 border-alert/30 text-alert-foreground';
      case 'wind':
        return 'bg-stormy/10 border-stormy/30 text-stormy-foreground';
      default:
        return 'bg-accent/50 border-border';
    }
  };

  return (
    <Card className="shadow-lg bg-card border-border">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-alert" />
          Weather Alerts
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {alerts.map((alert, index) => (
            <div 
              key={index}
              className={`p-4 rounded-lg border-2 ${getAlertStyle(alert.type)}`}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{alert.icon}</span>
                <div>
                  <div className="font-medium">{alert.message}</div>
                  <div className="text-sm opacity-80 capitalize">
                    {alert.type} alert
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AlertsPanel;