import Chnl from 'sountility/webaudio-chnl';
import Recorder from 'sountility/wrecorder';

export default class Wmstr extends Chnl {

  recorder;

  constructor(audioCtx, connectToSpeakers = true) {
    super(audioCtx);

    if (connectToSpeakers)
      this.connect(audioCtx.destination);

    this.recorder = new Recorder(this);
  }

  startRecording() {
    this.recorder.record();
  }

  stopRecording(filename = ``) {
    return new Promise((resolve) => {
      this.recorder.stop();

      this.recorder.exportWAV((blob) => {
        if (filename !== ``)
          Recorder.forceDownload(blob, filename);

        resolve(blob);
        this.recorder.clear();
      });
    });
  }
}
