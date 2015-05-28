import os,sys
import shutil

def copy_file(w,h):
    name = "LaunchImage320x480.html"
    dst = "LaunchImage%dx%d.html" % (w,h)
    shutil.copy(name,dst)
    f = open(dst,"r")
    lines = f.readlines()
    f.close()

    f = open(dst,"w")
    for line in lines:
        if line.find("drawRose(320,480)") != -1:
            line = line.replace("drawRose(320,480)","drawRose(%d,%d)" % (w,h))
        elif line.find("width=\"320\"")!=-1:
            line = line.replace("width=\"320\"","width=\"%d\"" % w)
            line = line.replace("height=\"480\"","height=\"%d\"" % h)
        f.write(line)
    f.close()
if __name__=="__main__":
    name = "LaunchImage320x480.html"
    names = [(640,960), (750, 1334), (640, 1136), (1536,2048),(1242,2208),(1536,2048),(768,1024),(1024,748),(768,1004),(1536,2008),(2048,1496)]
    copy_file(480,320)
    for r in names:
        copy_file(r[0],r[1])
        copy_file(r[1],r[0])
