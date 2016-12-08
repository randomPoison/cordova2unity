package com.cordova2unity;

import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.os.Bundle;
import android.util.Log;

import com.unity3d.player.UnityPlayerActivity;

public class GameActivity extends UnityPlayerActivity {
    @Override
    protected void onCreate(Bundle state) {
        super.onCreate(state);
        Log.d("cordova2unity", "Unity started");
    }

    public void restoreCordova() {
        Context context = this.getApplicationContext();
        // Intent intent = new Intent(context, MainActivity.class);

        PackageManager pm = context.getPackageManager();
        Intent intent = pm.getLaunchIntentForPackage(context.getPackageName());
        // context.startActivity(intent);

        this.startActivity(intent);
    }
}
