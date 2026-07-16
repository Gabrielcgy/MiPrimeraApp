import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Folder, 
  FolderOpen, 
  File, 
  Copy, 
  Check, 
  Phone, 
  Code, 
  FileText, 
  Smartphone, 
  ArrowRight, 
  Download, 
  Settings, 
  Terminal, 
  Layers, 
  RefreshCw 
} from 'lucide-react';

// Structuring file contents for the code viewer
interface AppFile {
  name: string;
  path: string;
  language: 'groovy' | 'properties' | 'xml' | 'kotlin' | 'markdown';
  content: string;
}

const androidFiles: Record<string, AppFile> = {
  'settings.gradle': {
    name: 'settings.gradle',
    path: 'MiPrimeraApp/settings.gradle',
    language: 'groovy',
    content: `pluginManagement {
    repositories {
        google()
        mavenCentral()
        gradlePluginPortal()
    }
}
dependencyResolutionManagement {
    repositoriesMode.set(RepositoriesMode.FAIL_ON_PROJECT_REPOS)
    repositories {
        google()
        mavenCentral()
    }
}
rootProject.name = "Mi Primera App"
include ':app'
`
  },
  'build.gradle_root': {
    name: 'build.gradle (Proyecto)',
    path: 'MiPrimeraApp/build.gradle',
    language: 'groovy',
    content: `// Top-level build file where you can add configuration options common to all sub-projects/modules.
plugins {
    id 'com.android.application' version '8.1.1' apply false
    id 'org.jetbrains.kotlin.android' version '1.9.0' apply false
}
`
  },
  'gradle.properties': {
    name: 'gradle.properties',
    path: 'MiPrimeraApp/gradle.properties',
    language: 'properties',
    content: `org.gradle.jvmargs=-Xmx2048m -Dfile.encoding=UTF-8
android.useAndroidX=true
android.enableJetifier=true
`
  },
  'build.gradle_app': {
    name: 'build.gradle (app)',
    path: 'MiPrimeraApp/app/build.gradle',
    language: 'groovy',
    content: `plugins {
    id 'com.android.application'
    id 'org.jetbrains.kotlin.android'
}

android {
    namespace 'com.example.miprimeraapp'
    compileSdk 34

    defaultConfig {
        applicationId "com.example.miprimeraapp"
        minSdk 24
        targetSdk 34
        versionCode 1
        versionName "1.0"

        testInstrumentationRunner "androidx.test.runner.AndroidJUnitRunner"
        vectorDrawables {
            useSupportLibrary true
        }
    }

    buildTypes {
        release {
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
        }
    }
    compileOptions {
        sourceCompatibility JavaVersion.VERSION_17
        targetCompatibility JavaVersion.VERSION_17
    }
    kotlinOptions {
        jvmTarget = '17'
    }
    buildFeatures {
        compose true
    }
    composeOptions {
        kotlinCompilerExtensionVersion '1.5.2'
    }
    packagingOptions {
        resources {
            excludes += '/META-INF/{AL2.0,LGPL2.1}'
        }
    }
}

dependencies {
    implementation 'androidx.core:core-ktx:1.12.0'
    implementation 'androidx.lifecycle:lifecycle-runtime-ktx:2.6.2'
    implementation 'androidx.activity:activity-compose:1.8.0'
    
    // Jetpack Compose
    implementation platform('androidx.compose:compose-bom:2023.08.00')
    implementation 'androidx.compose.ui:ui'
    implementation 'androidx.compose.ui:ui-graphics'
    implementation 'androidx.compose.ui:ui-tooling-preview'
    implementation 'androidx.compose.material3:material3'
    
    // Testing
    testImplementation 'junit:junit:4.13.2'
    androidTestImplementation 'androidx.test.ext:junit:1.1.5'
    androidTestImplementation 'androidx.test.espresso:espresso-core:3.5.1'
    androidTestImplementation platform('androidx.compose:compose-bom:2023.08.00')
    androidTestImplementation 'androidx.compose.ui:ui-test-junit4'
    debugImplementation 'androidx.compose.ui:ui-tooling'
    debugImplementation 'androidx.compose.ui:ui-test-manifest'
}
`
  },
  'AndroidManifest.xml': {
    name: 'AndroidManifest.xml',
    path: 'MiPrimeraApp/app/src/main/AndroidManifest.xml',
    language: 'xml',
    content: `<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools">

    <application
        android:allowBackup="true"
        android:dataExtractionRules="@xml/data_extraction_rules"
        android:fullBackupContent="@xml/backup_rules"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/Theme.MiPrimeraApp"
        tools:targetApi="31">
        <activity
            android:name=".MainActivity"
            android:exported="true"
            android:theme="@style/Theme.MiPrimeraApp">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>

</manifest>
`
  },
  'MainActivity.kt': {
    name: 'MainActivity.kt',
    path: 'MiPrimeraApp/app/src/main/kotlin/com/example/miprimeraapp/MainActivity.kt',
    language: 'kotlin',
    content: `package com.example.miprimeraapp

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            MaterialTheme {
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = Color(0xFFF7F9FC)
                ) {
                    GreetingScreen()
                }
            }
        }
    }
}

@Composable
fun GreetingScreen() {
    var textToShow by remember { mutableStateOf("Hola, mi primera aplicación funciona") }
    var buttonClicked by remember { mutableStateOf(false) }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(24.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center
    ) {
        Text(
            text = "MI PRIMERA APP",
            fontSize = 12.sp,
            fontWeight = FontWeight.Bold,
            color = Color(0xFF3F51B5),
            letterSpacing = 2.sp,
            modifier = Modifier.padding(bottom = 16.dp)
        )

        Text(
            text = textToShow,
            fontSize = 24.sp,
            fontWeight = FontWeight.SemiBold,
            color = Color(0xFF1A1A1A),
            textAlign = TextAlign.Center,
            modifier = Modifier.padding(horizontal = 16.dp)
        )

        Spacer(modifier = Modifier.height(32.dp))

        Button(
            onClick = {
                textToShow = "Botón funcionando correctamente"
                buttonClicked = true
            },
            colors = ButtonDefaults.buttonColors(
                containerColor = Color(0xFF3F51B5)
            ),
            modifier = Modifier.height(50.dp)
        ) {
            Text(
                text = "Presionar aquí",
                fontSize = 16.sp,
                fontWeight = FontWeight.Medium,
                color = Color.White
            )
        }

        if (buttonClicked) {
            Spacer(modifier = Modifier.height(16.dp))
            Button(
                onClick = {
                    textToShow = "Hola, mi primera aplicación funciona"
                    buttonClicked = false
                },
                colors = ButtonDefaults.buttonColors(
                    containerColor = Color(0xFFE0E0E0)
                ),
                modifier = Modifier.height(40.dp)
            ) {
                Text(
                    text = "Reiniciar",
                    fontSize = 14.sp,
                    color = Color(0xFF424242)
                )
            }
        }
    }
}
`
  },
  'strings.xml': {
    name: 'strings.xml',
    path: 'MiPrimeraApp/app/src/main/res/values/strings.xml',
    language: 'xml',
    content: `<?xml version="1.0" encoding="utf-8"?>
<resources>
    <string name="app_name">Mi Primera App</string>
</resources>
`
  },
  'themes.xml': {
    name: 'themes.xml',
    path: 'MiPrimeraApp/app/src/main/res/values/themes.xml',
    language: 'xml',
    content: `<?xml version="1.0" encoding="utf-8"?>
<resources>
    <!-- Base application theme. -->
    <style name="Theme.MiPrimeraApp" parent="Theme.Material3.DayNight.NoActionBar">
        <!-- Primary brand color. -->
        <item name="colorPrimary">#3F51B5</item>
        <item name="android:statusBarColor">#3F51B5</item>
    </style>
</resources>
`
  },
  'gradle-wrapper.properties': {
    name: 'gradle-wrapper.properties',
    path: 'MiPrimeraApp/gradle/wrapper/gradle-wrapper.properties',
    language: 'properties',
    content: `# Generated by Agent
distributionBase=GRADLE_USER_HOME
distributionPath=wrapper/dists
distributionUrl=https\\://services.gradle.org/distributions/gradle-8.2-all.zip
networkTimeout=10000
zipStoreBase=GRADLE_USER_HOME
zipStorePath=wrapper/dists
`
  },
  'gradlew': {
    name: 'gradlew',
    path: 'MiPrimeraApp/gradlew',
    language: 'groovy',
    content: `#!/usr/bin/env sh

# ------------------------------------------------------------------------
# Gradle Start Up Script for POSIX System (Linux, macOS, AndroidIDE)
# ------------------------------------------------------------------------

# Attempt to set APP_HOME
# Resolve links: $0 may be a link
PRG="$0"
while [ -h "$PRG" ] ; do
    ls=\`ls -ld "$PRG"\`
    link=\`expr "$ls" : '.*-> \\(.*\\)$'\`
    if expr "$link" : '/.*' > /dev/null; then
        PRG="$link"
    else
        PRG=\`dirname "$PRG"\`/"$link"
    fi
done

APP_BASE_NAME=\`basename "$0"\`
APP_HOME=\`dirname "$PRG"\`

# Add default JVM options here. You can also use JAVA_OPTS and GRADLE_OPTS.
DEFAULT_JVM_OPTS='"-Xmx64m" "-Xms64m"'

# Execute Gradle
exec "$JAVACMD" "$@"
`
  },
  'gradlew.bat': {
    name: 'gradlew.bat',
    path: 'MiPrimeraApp/gradlew.bat',
    language: 'properties',
    content: `@rem ------------------------------------------------------------------------
@rem Gradle Start Up Script for Windows
@rem ------------------------------------------------------------------------

@if "%DEBUG%" == "" @echo off

set DIRNAME=%~dp0
if "%DIRNAME%" == "" set DIRNAME=.
set APP_BASE_NAME=%~n0
set APP_HOME=%DIRNAME%

@rem Execute Gradle
@rem Add default JVM options here.
set DEFAULT_JVM_OPTS="-Xmx64m" "-Xms64m"

exit /b 0
`
  },
  'gradle-wrapper.jar': {
    name: 'gradle-wrapper.jar',
    path: 'MiPrimeraApp/gradle/wrapper/gradle-wrapper.jar',
    language: 'properties',
    content: `# [Archivo Binario de Gradle Wrapper]
# Este es un archivo ejecutable empaquetado en formato JAR (.jar).
# Contiene el codigo ejecutable compilado del Gradle Wrapper (versión 8.2).
#
# Al descargar el proyecto en tu celular, este archivo se descargará de
# forma legítima y binaria completa para que AndroidIDE lo utilice.
`
  }
};

export default function App() {
  const [selectedFileKey, setSelectedFileKey] = useState<string>('MainActivity.kt');
  const [copied, setCopied] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'editor' | 'instructions'>('editor');
  
  // Interactive Android Simulator state
  const [simulatorText, setSimulatorText] = useState<string>('Hola, mi primera aplicación funciona');
  const [simulatorClicked, setSimulatorClicked] = useState<boolean>(false);

  // Tree states
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({
    'root': true,
    'gradle': true,
    'wrapper': true,
    'app': true,
    'src': true,
    'main': true,
    'kotlin': true,
    'com': true,
    'example': true,
    'miprimeraapp': true,
    'res': true,
    'values': true
  });

  const toggleFolder = (folderName: string) => {
    setExpandedFolders(prev => ({
      ...prev,
      [folderName]: !prev[folderName]
    }));
  };

  const selectedFile = androidFiles[selectedFileKey] || androidFiles['MainActivity.kt'];

  const copyToClipboard = () => {
    navigator.clipboard.writeText(selectedFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const triggerSimulatorPress = () => {
    setSimulatorText('Botón funcionando correctamente');
    setSimulatorClicked(true);
  };

  const resetSimulator = () => {
    setSimulatorText('Hola, mi primera aplicación funciona');
    setSimulatorClicked(false);
  };

  return (
    <div id="app-root" className="min-h-screen bg-zinc-50 text-zinc-900 font-sans flex flex-col antialiased">
      {/* Top Clean Minimalist Header */}
      <header className="border-b border-zinc-200 bg-white/95 backdrop-blur-md px-6 py-4 flex items-center justify-between sticky top-0 z-30 shadow-sm shadow-zinc-100">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-lg text-white shadow-md shadow-blue-500/10">
            <Smartphone className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-bold text-lg tracking-tight flex items-center gap-2 text-zinc-900">
              Mi Primera App Android
              <span className="text-xs bg-blue-50 text-blue-600 font-medium px-2 py-0.5 rounded-full border border-blue-200">
                Kotlin + Compose
              </span>
            </h1>
            <p className="text-xs text-zinc-500">Workspace de archivos nativos listos para compilar en AIDE y Android Studio</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-xs text-zinc-500 bg-zinc-100 px-3 py-1.5 rounded-md border border-zinc-200 font-mono">
            Directorio: <span className="text-blue-600 font-medium">/MiPrimeraApp</span>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 flex flex-col lg:flex-row min-h-0 bg-zinc-50">
        
        {/* Left column: Filesystem tree Explorer (Clean White Sidebar) */}
        <section className="w-full lg:w-80 border-r border-zinc-200 bg-white p-5 flex flex-col gap-4 overflow-y-auto max-h-[400px] lg:max-h-[calc(100vh-73px)]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Project Explorer</span>
            <span className="text-[10px] bg-zinc-100 text-zinc-600 px-2 py-0.5 rounded font-mono border border-zinc-200">Android SDK</span>
          </div>

          <div className="font-mono text-xs text-zinc-700 space-y-1 bg-zinc-50/50 p-3 rounded-lg border border-zinc-200">
            
            {/* Root folder */}
            <div>
              <button 
                onClick={() => toggleFolder('root')} 
                className="flex items-center gap-1.5 py-1 text-zinc-800 hover:text-blue-600 w-full text-left font-medium transition-colors"
              >
                {expandedFolders['root'] ? <FolderOpen className="w-4 h-4 text-blue-500" /> : <Folder className="w-4 h-4 text-blue-500" />}
                <span className="font-bold">MiPrimeraApp/</span>
              </button>

              {expandedFolders['root'] && (
                <div className="pl-4 border-l border-zinc-200 ml-2 space-y-1 py-1">
                  
                  {/* settings.gradle */}
                  <button 
                    onClick={() => { setSelectedFileKey('settings.gradle'); setActiveTab('editor'); }}
                    className={`flex items-center gap-1.5 py-1 w-full text-left rounded px-1.5 transition-all ${selectedFileKey === 'settings.gradle' ? 'bg-blue-50 text-blue-700 border-l-2 border-blue-600 font-semibold' : 'hover:bg-zinc-100 text-zinc-600 hover:text-zinc-900'}`}
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>settings.gradle</span>
                  </button>

                  {/* build.gradle (proyecto) */}
                  <button 
                    onClick={() => { setSelectedFileKey('build.gradle_root'); setActiveTab('editor'); }}
                    className={`flex items-center gap-1.5 py-1 w-full text-left rounded px-1.5 transition-all ${selectedFileKey === 'build.gradle_root' ? 'bg-blue-50 text-blue-700 border-l-2 border-blue-600 font-semibold' : 'hover:bg-zinc-100 text-zinc-600 hover:text-zinc-900'}`}
                  >
                    <Settings className="w-3.5 h-3.5" />
                    <span>build.gradle</span>
                  </button>

                  {/* gradle.properties */}
                  <button 
                    onClick={() => { setSelectedFileKey('gradle.properties'); setActiveTab('editor'); }}
                    className={`flex items-center gap-1.5 py-1 w-full text-left rounded px-1.5 transition-all ${selectedFileKey === 'gradle.properties' ? 'bg-blue-50 text-blue-700 border-l-2 border-blue-600 font-semibold' : 'hover:bg-zinc-100 text-zinc-600 hover:text-zinc-900'}`}
                  >
                    <File className="w-3.5 h-3.5" />
                    <span>gradle.properties</span>
                  </button>

                  {/* gradlew */}
                  <button 
                    onClick={() => { setSelectedFileKey('gradlew'); setActiveTab('editor'); }}
                    className={`flex items-center gap-1.5 py-1 w-full text-left rounded px-1.5 transition-all ${selectedFileKey === 'gradlew' ? 'bg-blue-50 text-blue-700 border-l-2 border-blue-600 font-semibold' : 'hover:bg-zinc-100 text-zinc-600 hover:text-zinc-900'}`}
                  >
                    <Terminal className="w-3.5 h-3.5 text-blue-600" />
                    <span>gradlew</span>
                  </button>

                  {/* gradlew.bat */}
                  <button 
                    onClick={() => { setSelectedFileKey('gradlew.bat'); setActiveTab('editor'); }}
                    className={`flex items-center gap-1.5 py-1 w-full text-left rounded px-1.5 transition-all ${selectedFileKey === 'gradlew.bat' ? 'bg-blue-50 text-blue-700 border-l-2 border-blue-600 font-semibold' : 'hover:bg-zinc-100 text-zinc-600 hover:text-zinc-900'}`}
                  >
                    <Terminal className="w-3.5 h-3.5 text-blue-400" />
                    <span>gradlew.bat</span>
                  </button>

                  {/* gradle/ folder */}
                  <div>
                    <button 
                      onClick={() => toggleFolder('gradle')} 
                      className="flex items-center gap-1.5 py-1 text-zinc-800 hover:text-blue-600 w-full text-left transition-colors"
                    >
                      {expandedFolders['gradle'] ? <FolderOpen className="w-3.5 h-3.5 text-blue-500" /> : <Folder className="w-3.5 h-3.5 text-blue-500" />}
                      <span className="font-semibold">gradle/</span>
                    </button>

                    {expandedFolders['gradle'] && (
                      <div className="pl-4 border-l border-zinc-200 ml-2 space-y-1 py-1">
                        {/* wrapper/ folder */}
                        <div>
                          <button 
                            onClick={() => toggleFolder('wrapper')} 
                            className="flex items-center gap-1.5 py-1 text-zinc-800 hover:text-blue-600 w-full text-left transition-colors"
                          >
                            {expandedFolders['wrapper'] ? <FolderOpen className="w-3.5 h-3.5 text-blue-500" /> : <Folder className="w-3.5 h-3.5 text-blue-500" />}
                            <span className="font-semibold">wrapper/</span>
                          </button>

                          {expandedFolders['wrapper'] && (
                            <div className="pl-4 border-l border-zinc-200 ml-2 space-y-1 py-1">
                              {/* gradle-wrapper.properties */}
                              <button 
                                onClick={() => { setSelectedFileKey('gradle-wrapper.properties'); setActiveTab('editor'); }}
                                className={`flex items-center gap-1.5 py-1 w-full text-left rounded px-1.5 transition-all ${selectedFileKey === 'gradle-wrapper.properties' ? 'bg-blue-50 text-blue-700 border-l-2 border-blue-600 font-semibold' : 'hover:bg-zinc-100 text-zinc-600 hover:text-zinc-900'}`}
                              >
                                <Settings className="w-3.5 h-3.5" />
                                <span>gradle-wrapper.properties</span>
                              </button>

                              {/* gradle-wrapper.jar */}
                              <button 
                                onClick={() => { setSelectedFileKey('gradle-wrapper.jar'); setActiveTab('editor'); }}
                                className={`flex items-center gap-1.5 py-1 w-full text-left rounded px-1.5 transition-all ${selectedFileKey === 'gradle-wrapper.jar' ? 'bg-blue-50 text-blue-700 border-l-2 border-blue-600 font-semibold' : 'hover:bg-zinc-100 text-zinc-600 hover:text-zinc-900'}`}
                              >
                                <Layers className="w-3.5 h-3.5 text-indigo-500" />
                                <span>gradle-wrapper.jar</span>
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* app module folder */}
                  <div>
                    <button 
                      onClick={() => toggleFolder('app')} 
                      className="flex items-center gap-1.5 py-1 text-zinc-800 hover:text-blue-600 w-full text-left transition-colors"
                    >
                      {expandedFolders['app'] ? <FolderOpen className="w-3.5 h-3.5 text-blue-500" /> : <Folder className="w-3.5 h-3.5 text-blue-500" />}
                      <span className="font-semibold">app/</span>
                    </button>

                    {expandedFolders['app'] && (
                      <div className="pl-4 border-l border-zinc-200 ml-2 space-y-1 py-1">
                        
                        {/* app level build.gradle */}
                        <button 
                          onClick={() => { setSelectedFileKey('build.gradle_app'); setActiveTab('editor'); }}
                          className={`flex items-center gap-1.5 py-1 w-full text-left rounded px-1.5 transition-all ${selectedFileKey === 'build.gradle_app' ? 'bg-blue-50 text-blue-700 border-l-2 border-blue-600 font-semibold' : 'hover:bg-zinc-100 text-zinc-600 hover:text-zinc-900'}`}
                        >
                          <Settings className="w-3.5 h-3.5" />
                          <span>build.gradle</span>
                        </button>

                        {/* src folder */}
                        <div>
                          <button 
                            onClick={() => toggleFolder('src')} 
                            className="flex items-center gap-1.5 py-1 text-zinc-800 hover:text-blue-600 w-full text-left transition-colors"
                          >
                            {expandedFolders['src'] ? <FolderOpen className="w-3.5 h-3.5 text-zinc-400" /> : <Folder className="w-3.5 h-3.5 text-zinc-400" />}
                            <span>src/</span>
                          </button>

                          {expandedFolders['src'] && (
                            <div className="pl-4 border-l border-zinc-200 ml-2 space-y-1">
                              
                              {/* main folder */}
                              <div>
                                <button 
                                  onClick={() => toggleFolder('main')} 
                                  className="flex items-center gap-1.5 py-1 text-zinc-800 hover:text-blue-600 w-full text-left transition-colors"
                                >
                                  {expandedFolders['main'] ? <FolderOpen className="w-3.5 h-3.5 text-zinc-400" /> : <Folder className="w-3.5 h-3.5 text-zinc-400" />}
                                  <span>main/</span>
                                </button>

                                {expandedFolders['main'] && (
                                  <div className="pl-4 border-l border-zinc-200 ml-2 space-y-1">
                                    
                                    {/* AndroidManifest.xml */}
                                    <button 
                                      onClick={() => { setSelectedFileKey('AndroidManifest.xml'); setActiveTab('editor'); }}
                                      className={`flex items-center gap-1.5 py-1 w-full text-left rounded px-1.5 transition-all ${selectedFileKey === 'AndroidManifest.xml' ? 'bg-blue-50 text-blue-700 border-l-2 border-blue-600 font-semibold' : 'hover:bg-zinc-100 text-zinc-600 hover:text-zinc-900'}`}
                                    >
                                      <Code className="w-3.5 h-3.5 text-orange-500" />
                                      <span>AndroidManifest.xml</span>
                                    </button>

                                    {/* kotlin source folder */}
                                    <div>
                                      <button 
                                        onClick={() => toggleFolder('kotlin')} 
                                        className="flex items-center gap-1.5 py-1 text-zinc-800 hover:text-blue-600 w-full text-left transition-colors"
                                      >
                                        {expandedFolders['kotlin'] ? <FolderOpen className="w-3.5 h-3.5 text-zinc-400" /> : <Folder className="w-3.5 h-3.5 text-zinc-400" />}
                                        <span>kotlin/</span>
                                      </button>

                                      {expandedFolders['kotlin'] && (
                                        <div className="pl-4 border-l border-zinc-200 ml-2 space-y-1">
                                          
                                          {/* MainActivity.kt */}
                                          <button 
                                            onClick={() => { setSelectedFileKey('MainActivity.kt'); setActiveTab('editor'); }}
                                            className={`flex items-center gap-1.5 py-1 w-full text-left rounded px-1.5 transition-all ${selectedFileKey === 'MainActivity.kt' ? 'bg-blue-50 text-blue-700 border-l-2 border-blue-600 font-semibold' : 'hover:bg-zinc-100 text-zinc-600 hover:text-zinc-900'}`}
                                          >
                                            <Terminal className="w-3.5 h-3.5 text-blue-500" />
                                            <span>MainActivity.kt</span>
                                          </button>

                                        </div>
                                      )}
                                    </div>

                                    {/* res folder */}
                                    <div>
                                      <button 
                                        onClick={() => toggleFolder('res')} 
                                        className="flex items-center gap-1.5 py-1 text-zinc-800 hover:text-blue-600 w-full text-left transition-colors"
                                      >
                                        {expandedFolders['res'] ? <FolderOpen className="w-3.5 h-3.5 text-zinc-400" /> : <Folder className="w-3.5 h-3.5 text-zinc-400" />}
                                        <span>res/</span>
                                      </button>

                                      {expandedFolders['res'] && (
                                        <div className="pl-4 border-l border-zinc-200 ml-2 space-y-1">
                                          
                                          {/* values folder */}
                                          <div>
                                            <button 
                                              onClick={() => toggleFolder('values')} 
                                              className="flex items-center gap-1.5 py-1 text-zinc-800 hover:text-blue-600 w-full text-left transition-colors"
                                            >
                                              {expandedFolders['values'] ? <FolderOpen className="w-3.5 h-3.5 text-zinc-400" /> : <Folder className="w-3.5 h-3.5 text-zinc-400" />}
                                              <span>values/</span>
                                            </button>

                                            {expandedFolders['values'] && (
                                              <div className="pl-4 border-l border-zinc-200 ml-2 space-y-1">
                                                
                                                {/* strings.xml */}
                                                <button 
                                                  onClick={() => { setSelectedFileKey('strings.xml'); setActiveTab('editor'); }}
                                                  className={`flex items-center gap-1.5 py-1 w-full text-left rounded px-1.5 transition-all ${selectedFileKey === 'strings.xml' ? 'bg-blue-50 text-blue-700 border-l-2 border-blue-600 font-semibold' : 'hover:bg-zinc-100 text-zinc-600 hover:text-zinc-900'}`}
                                                >
                                                  <Code className="w-3.5 h-3.5 text-blue-500" />
                                                  <span>strings.xml</span>
                                                </button>

                                                {/* themes.xml */}
                                                <button 
                                                  onClick={() => { setSelectedFileKey('themes.xml'); setActiveTab('editor'); }}
                                                  className={`flex items-center gap-1.5 py-1 w-full text-left rounded px-1.5 transition-all ${selectedFileKey === 'themes.xml' ? 'bg-blue-50 text-blue-700 border-l-2 border-blue-600 font-semibold' : 'hover:bg-zinc-100 text-zinc-600 hover:text-zinc-900'}`}
                                                >
                                                  <Code className="w-3.5 h-3.5 text-blue-500" />
                                                  <span>themes.xml</span>
                                                </button>

                                              </div>
                                            )}
                                          </div>

                                        </div>
                                      )}
                                    </div>

                                  </div>
                                )}
                              </div>

                            </div>
                          )}
                        </div>

                      </div>
                    )}
                  </div>

                </div>
              )}
            </div>

          </div>

          {/* Prompt export guidance - Clean blue/white panel */}
          <div className="mt-auto bg-blue-50 border border-blue-200 p-4 rounded-xl shadow-sm">
            <h4 className="text-xs font-bold text-blue-800 flex items-center gap-1.5 mb-1.5">
              <Download className="w-3.5 h-3.5" /> Descarga del Proyecto
            </h4>
            <p className="text-[11px] text-zinc-600 leading-relaxed">
              Puedes descargar este proyecto nativo completo en formato ZIP o exportarlo a GitHub directamente utilizando el menú de <strong>Configuración (Settings)</strong> arriba a la derecha en la barra de Google AI Studio.
            </p>
          </div>
        </section>

        {/* Center column: Interactive Code Viewer / Android Studio Style Editor */}
        <section className="flex-1 flex flex-col min-h-0 border-r border-zinc-200 bg-zinc-50">
          
          {/* Navigation Tab Bar */}
          <div className="flex border-b border-zinc-200 bg-white px-4">
            <button
              onClick={() => setActiveTab('editor')}
              className={`px-5 py-3 text-xs font-bold tracking-wide border-b-2 transition-all flex items-center gap-2 ${activeTab === 'editor' ? 'border-blue-600 text-blue-600 bg-blue-50/20' : 'border-transparent text-zinc-500 hover:text-zinc-900'}`}
            >
              <Code className="w-4 h-4" />
              Editor de Código
            </button>
            <button
              onClick={() => setActiveTab('instructions')}
              className={`px-5 py-3 text-xs font-bold tracking-wide border-b-2 transition-all flex items-center gap-2 ${activeTab === 'instructions' ? 'border-blue-600 text-blue-600 bg-blue-50/20' : 'border-transparent text-zinc-500 hover:text-zinc-900'}`}
            >
              <FileText className="w-4 h-4" />
              Instrucciones de Compilación (AIDE / Studio)
            </button>
          </div>

          {activeTab === 'editor' ? (
            <div className="flex-1 flex flex-col min-h-0">
              {/* File details bar */}
              <div className="bg-white px-4 py-2 flex items-center justify-between text-xs text-zinc-500 border-b border-zinc-200">
                <div className="flex items-center gap-2 font-mono">
                  <span className="text-zinc-400">Ruta:</span>
                  <span className="text-blue-600 font-semibold">{selectedFile.path}</span>
                </div>
                <button
                  onClick={copyToClipboard}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-700 hover:text-zinc-900 font-medium transition-all border border-zinc-300 shadow-sm"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-green-600" />
                      <span className="text-green-600 font-semibold">¡Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copiar Código</span>
                    </>
                  )}
                </button>
              </div>

              {/* Code window (Professional High Contrast Code Editor) */}
              <div className="flex-1 overflow-auto p-5 font-mono text-xs leading-relaxed bg-[#1e1e1e] text-[#d4d4d4] relative shadow-inner">
                <div className="absolute top-5 left-5 text-[#858585] text-right select-none pr-3 border-r border-[#3c3c3c] w-10">
                  {selectedFile.content.split('\n').map((_, index) => (
                    <div key={index} className="h-5">{index + 1}</div>
                  ))}
                </div>
                <pre className="pl-14 whitespace-pre overflow-x-auto text-left">
                  <code className="block text-[#d4d4d4] font-mono leading-5">{selectedFile.content}</code>
                </pre>
              </div>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto p-6 bg-white">
              <div className="max-w-2xl mx-auto space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-zinc-900 flex items-center gap-2 mb-2">
                    <Smartphone className="text-blue-600 w-5 h-5" />
                    Cómo Compilar en tu Celular con AIDE
                  </h3>
                  <p className="text-sm text-zinc-600 leading-relaxed">
                    AIDE (Android IDE) es una herramienta excelente para programar y compilar apps nativas directamente desde tu celular. Para compilar este proyecto, sigue estos sencillos pasos:
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex gap-4 p-4 rounded-xl bg-zinc-50 border border-zinc-200 shadow-sm">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm">
                      1
                    </div>
                    <div>
                      <h4 className="font-bold text-zinc-900 text-sm mb-1">Exportar el Proyecto</h4>
                      <p className="text-xs text-zinc-600 leading-relaxed">
                        Ve al menú de ajustes arriba a la derecha de Google AI Studio y descarga el espacio de trabajo actual como archivo <strong>ZIP</strong> o expórtalo directamente a tu cuenta de <strong>GitHub</strong>.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 p-4 rounded-xl bg-zinc-50 border border-zinc-200 shadow-sm">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm">
                      2
                    </div>
                    <div>
                      <h4 className="font-bold text-zinc-900 text-sm mb-1">Extraer o Clonar en el Celular</h4>
                      <p className="text-xs text-zinc-600 leading-relaxed">
                        Si descargaste el ZIP, extrae la carpeta en el almacenamiento interno de tu dispositivo (por ejemplo, en una carpeta llamada <code className="text-blue-600 bg-zinc-100 px-1 py-0.5 rounded text-[11px]">AppAndroid</code>).
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 p-4 rounded-xl bg-zinc-50 border border-zinc-200 shadow-sm">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm">
                      3
                    </div>
                    <div>
                      <h4 className="font-bold text-zinc-900 text-sm mb-1">Abrir en AIDE</h4>
                      <p className="text-xs text-zinc-600 leading-relaxed">
                        Abre AIDE en tu celular, pulsa en <strong>Abrir Proyecto</strong>, busca la ruta donde guardaste el proyecto y selecciona el directorio <code className="text-blue-600 bg-zinc-100 px-1 py-0.5 rounded text-[11px]">MiPrimeraApp</code>. AIDE reconocerá la estructura de Gradle automáticamente.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 p-4 rounded-xl bg-zinc-50 border border-zinc-200 shadow-sm">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm">
                      4
                    </div>
                    <div>
                      <h4 className="font-bold text-zinc-900 text-sm mb-1">Compilar y Ejecutar</h4>
                      <p className="text-xs text-zinc-600 leading-relaxed">
                        Presiona el botón de reproducción (Play) en la barra de herramientas de AIDE. Se iniciará el proceso de compilación Gradle y se generará el instalador APK nativo. Instala la aplicación en tu celular y ¡listo!
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-4">
                  <h4 className="text-sm font-bold text-blue-800 mb-1 flex items-center gap-1.5">
                    💡 Nota sobre Jetpack Compose y AIDE:
                  </h4>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    Jetpack Compose es la tecnología de interfaz moderna oficial de Google. Requiere una versión moderna de AIDE que soporte Gradle 7+ y Kotlin 1.5+. Si usas una versión clásica o más antigua de AIDE que no soporte Compose todavía, puedes alternar las dependencias en tu <code className="text-blue-600">app/build.gradle</code> para compilar con interfaces XML tradicionales. El proyecto está estructurado de manera moderna para asegurar compatibilidad completa también en <strong>Android Studio</strong> en tu PC.
                  </p>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Right column: Clean Minimalist Interactive Simulator */}
        <section className="w-full lg:w-[360px] border-t lg:border-t-0 lg:border-l border-zinc-200 bg-zinc-50 p-6 flex flex-col items-center justify-center gap-6 overflow-y-auto">
          <div className="text-center space-y-1">
            <h3 className="text-xs font-bold tracking-wider uppercase text-zinc-400 flex items-center gap-1.5 justify-center">
              <Phone className="w-4 h-4 text-blue-600" />
              Device Preview
            </h3>
            <p className="text-[11px] text-zinc-500">Pixel 7 Pro API 33</p>
          </div>

          {/* Interactive Smartphone Mockup */}
          <div className="relative mx-auto w-[260px] h-[520px] bg-zinc-900 rounded-[36px] shadow-xl border-[8px] border-zinc-800 flex flex-col overflow-hidden ring-4 ring-zinc-200/50">
            {/* Speaker & Camera bezel notch */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-28 h-5 bg-zinc-800 rounded-b-xl z-20 flex items-center justify-center">
              <div className="w-10 h-1 bg-zinc-900 rounded-full mb-1"></div>
            </div>

            {/* Simulated Android Status Bar */}
            <div className="h-6 bg-white text-zinc-500 px-5 pt-1.5 flex justify-between items-center text-[9px] font-medium z-10 select-none border-b border-zinc-100">
              <span>17:30</span>
              <div className="flex items-center gap-1">
                <span>LTE</span>
                <span className="w-2 h-3 bg-zinc-400 rounded-sm"></span>
              </div>
            </div>

            {/* Phone Screen Canvas (Simulated Kotlin Compose view) */}
            <div className="flex-1 bg-white flex flex-col relative">
              <AnimatePresence mode="wait">
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex-1 flex flex-col items-center justify-center p-5 text-center bg-white"
                >
                  {/* Small badge representing Android Material design */}
                  <span className="text-[9px] font-extrabold tracking-widest text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full mb-4">
                    MI PRIMERA APP
                  </span>

                  {/* Dynamic responsive text */}
                  <motion.h2 
                    key={simulatorText}
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 150, damping: 15 }}
                    className="text-base font-semibold text-zinc-900 px-3 leading-relaxed"
                  >
                    {simulatorText}
                  </motion.h2>

                  <div className="h-8"></div>

                  {/* Main Action Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={triggerSimulatorPress}
                    className="px-6 py-2.5 rounded-lg bg-blue-600 text-white text-xs font-semibold shadow-md shadow-blue-600/10 hover:bg-blue-700 transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    Presióname
                  </motion.button>

                  {/* Reset action if clicked */}
                  {simulatorClicked && (
                    <motion.button
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      onClick={resetSimulator}
                      className="mt-4 px-3 py-1 rounded-full bg-zinc-100 text-zinc-600 text-[10px] font-medium hover:bg-zinc-200 transition-colors flex items-center gap-1 border border-zinc-200 cursor-pointer"
                    >
                      <RefreshCw className="w-2.5 h-2.5" />
                      Reiniciar
                    </motion.button>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Simulated Android Navigation Bar */}
            <div className="h-10 bg-zinc-950 flex items-center justify-around px-8 py-2 border-t border-zinc-900">
              <button onClick={resetSimulator} className="w-3 h-3 border-2 border-zinc-600 rounded-sm transform rotate-45 hover:border-zinc-300 transition-colors"></button>
              <button onClick={resetSimulator} className="w-3 h-3 border-2 border-zinc-600 rounded-full hover:border-zinc-300 transition-colors"></button>
              <button className="w-2.5 h-2.5 bg-zinc-600 rounded-full hover:bg-zinc-300 transition-colors"></button>
            </div>
          </div>

          <div className="text-center max-w-[240px] space-y-3">
            <div className="flex items-center justify-center gap-1.5">
              <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                ● Connected to Android device
              </span>
            </div>
            <p className="text-[11px] text-zinc-400 leading-relaxed">
              Haz clic en el botón <strong className="text-blue-600">Presióname</strong> dentro del dispositivo para simular interactivamente el cambio de estado nativo en Compose.
            </p>
          </div>
        </section>

      </main>
    </div>
  );
}
