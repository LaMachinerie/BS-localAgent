arduino-builder \
-compile \
-verbose=false \
-hardware /usr/share/arduino/hardware \
-build-path=/opt/BS-localAgent/build \
-tools /usr/share/arduino/hardware/tools/avr \
-tools /opt/BS-localAgent/build/tools-builder \
-libraries=/opt/BS-localAgent/builder/libraries \
-fqbn=arduino:avr:LilyPadUSB /opt/BS-localAgent/sketch/sketch.ino