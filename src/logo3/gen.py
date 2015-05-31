import os,sys
import shutil

if __name__=="__main__":
    name = "logo36.html"
    names = [29,40,48,50,57,58,72,76,80,87,96,100,57*2,120,144,152,180]
    for r in names:
        dst = "logo%d.html" % r
        shutil.copy(name,dst)
        
        f = open(dst,"r")
        lines = f.readlines()
        f.close()

        f = open(dst,"w")
        for line in lines:
            if line.find("drawCanvas(36)") != -1:
                line = line.replace("drawCanvas(36)","drawCanvas(%d)" % r)
            elif line.find("width=\"36\"")!=-1:
                line = line.replace("36","%d"%r)
            f.write(line)
        f.close()
